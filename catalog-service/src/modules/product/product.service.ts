import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IProduct } from './interfaces/product.interface';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import * as slug from 'slug';
import { FindAllProductDto } from './dto/find-all-product.dto';
import mongoose from 'mongoose';
import {
  DEFAULT_DBQUERY_LIMIT,
  DEFAULT_DBQUERY_SKIP,
  DEFAULT_DBQUERY_SORT,
} from 'src/common/constants';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/schemas/category.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetRelatedProductsDto } from './dto/ get-related-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async findOne(id: string): Promise<IProduct> {
    const foundProduct = await this.productModel.findById(id).lean();
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    foundProduct._id = foundProduct._id.toString();
    foundProduct.categoryId = foundProduct.categoryId.toString();
    return foundProduct;
  }

  async findAll(query: FindAllProductDto): Promise<IProduct[]> {
    const {
      startId,
      skip,
      limit,
      sort,
      categoryId,
      price,
      name,
      isEnabled,
      isPublic,
      originalPrice,
      stockQuantity,
      soldQuantity,
      tags,
      keyword,
    } = query;

    const filters = [];
    startId && filters.push({ _id: { $gt: startId } });
    categoryId &&
      filters.push({ categoryId: new mongoose.Types.ObjectId(categoryId) });
    name && filters.push({ name });
    isEnabled !== undefined && filters.push({ isEnabled });
    isPublic !== undefined && filters.push({ isPublic });
    keyword && filters.push({ $text: { $search: keyword } });
    tags && filters.push({ tags: { $all: tags } });
    price && filters.push({ price: price.toMongooseFormat() });
    originalPrice &&
      filters.push({ originalPrice: originalPrice.toMongooseFormat() });
    stockQuantity &&
      filters.push({ stockQuantity: stockQuantity.toMongooseFormat() });
    soldQuantity &&
      filters.push({ soldQuantity: soldQuantity.toMongooseFormat() });

    const dbQuery = this.productModel.aggregate();

    filters.length !== 0 && dbQuery.match({ $and: filters });

    dbQuery
      .skip(skip ? skip : DEFAULT_DBQUERY_SKIP)
      .limit(limit ? limit : DEFAULT_DBQUERY_LIMIT)
      .append({
        $set: {
          _id: { $toString: '$_id' },
          categoryId: { $toString: '$categoryId' },
          // relevance: { $meta: 'textScore' },
        },
      })
      .append({
        $sort: sort
          ? sort
          : keyword
          ? { relevance: { $meta: 'textScore' } }
          : DEFAULT_DBQUERY_SORT,
      });
    return await dbQuery.exec();
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return await this.productModel.find({ _id: { $in: ids } }).lean();
  }

  async create(dto: CreateProductDto): Promise<IProduct> {
    const { name, categoryId } = dto;

    // check uniqueness of name
    const productByName = await this.productModel
      .findOne({
        name,
      })
      .lean();
    if (productByName) {
      throw new ConflictException('Product name is already exist');
    }

    // check if category existed
    await this.categoryService.findOne(categoryId);

    const createdProduct = await this.productModel.create({
      ...dto,
      slug: slug(name),
    });

    return createdProduct;
  }

  async update(id: string, dto: UpdateProductDto): Promise<IProduct> {
    const updatePattern: any = dto;
    if (dto.name) {
      updatePattern.slug = slug(dto.name);
    }
    const existingProduct = this.productModel.findByIdAndUpdate(
      id,
      updatePattern,
      {
        new: true,
      },
    );
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    return existingProduct;
  }

  async deleteOne(id: string): Promise<void> {
    const foundProduct = await this.productModel.findById(id);
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    await foundProduct.delete();
  }

  async deleteMany(ids: string[]): Promise<void> {
    const foundProducts = await this.productModel.find({
      _id: { $in: ids },
    });
    if (foundProducts.length !== ids.length) {
      throw new NotFoundException('One or several products do not exist');
    }

    const session = await this.dbConnection.startSession();
    session.startTransaction();
    try {
      await Promise.all(
        foundProducts.map((product) => product.delete({ session })),
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async deleteByCategory(category: Category, session?: any): Promise<void> {
    await this.productModel.deleteMany(
      { categoryId: category.id },
      { session },
    );
  }

  async decreaseStockQuantity(items: any[]): Promise<void> {
    await this.productModel.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { stockQuantity: -Math.abs(item.quantity) } },
        },
      })),
    );
  }

  async increaseStockQuantity(items: any[]): Promise<void> {
    await this.productModel.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { stockQuantity: Math.abs(item.quantity) } },
        },
      })),
    );
  }

  async getRelated(
    id: string,
    dto: GetRelatedProductsDto,
  ): Promise<IProduct[]> {
    const originalProduct = await this.productModel.findById(id).lean();
    if (!originalProduct) throw new NotFoundException('Product not found');
    const { name, tags, metaKeywords, categoryId, _id } = originalProduct;
    const filters: FilterQuery<Product> = {
      $text: {
        $search: `${name} ${metaKeywords?.split(',')} ${tags.join(' ')}`,
      },
      categoryId,
      _id: { $ne: _id },
    };
    const { startId, skip, limit } = dto;
    startId && filters.push({ _id: { gt: startId } });
    const result = await this.productModel
      .find(filters)
      .skip(skip ? skip : 0)
      .limit(limit ? limit : DEFAULT_DBQUERY_LIMIT)
      .sort({ relevance: { $meta: 'textScore' } });
    return result;
  }
}

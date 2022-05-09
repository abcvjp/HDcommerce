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
import { ObjectId } from 'mongodb';
import {
  DEFAULT_DBQUERY_LIMIT,
  DEFAULT_DBQUERY_SKIP,
  DEFAULT_DBQUERY_SORT,
} from 'src/common/constants';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/schemas/category.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetRelatedProductsDto } from './dto/ get-related-product.dto';
import { ReviewProductDto } from './dto/review-product.dto';
import { IReview } from '../review/interfaces/review.interface';
import { ReviewService } from '../review/review.service';
import { FindAllResult } from 'src/common/classes/find-all.result';
import { DeleteMultiProductDto } from './dto/delete-multi-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    private readonly reviewService: ReviewService,
  ) {}

  async findOne(id: string): Promise<IProduct> {
    const [foundProduct] = await this.productModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $set: {
          category: { $arrayElemAt: ['$category', 0] },
        },
      },
      { $project: { 'category.children': 0 } },
    ]);
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    foundProduct._id = foundProduct._id.toString();
    foundProduct.categoryId = foundProduct.categoryId.toString();
    foundProduct.category._id = foundProduct.category._id.toString();
    return foundProduct;
  }

  async findAll(query: FindAllProductDto): Promise<FindAllResult<IProduct>> {
    const {
      startId,
      skip,
      limit,
      sort,
      categoryId,
      includeCategory,
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

    const conditions = [];
    startId && conditions.push({ _id: { $gt: startId } });
    categoryId &&
      conditions.push({ categoryId: new mongoose.Types.ObjectId(categoryId) });
    name && conditions.push({ name });
    isEnabled !== undefined && conditions.push({ isEnabled });
    isPublic !== undefined && conditions.push({ isPublic });
    keyword && conditions.push({ $text: { $search: keyword } });
    tags && conditions.push({ tags: { $all: tags } });
    price && conditions.push({ price: price.toMongooseFormat() });
    originalPrice &&
      conditions.push({ originalPrice: originalPrice.toMongooseFormat() });
    stockQuantity &&
      conditions.push({ stockQuantity: stockQuantity.toMongooseFormat() });
    soldQuantity &&
      conditions.push({ soldQuantity: soldQuantity.toMongooseFormat() });

    const dbQuery = this.productModel.aggregate();

    let filters = {};
    conditions.length !== 0 && (filters = { $and: conditions });
    dbQuery.match(filters);

    if (includeCategory === true) {
      dbQuery
        .lookup({
          from: 'categories',
          let: { categoryId: '$categoryId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$categoryId'] } } },
            { $project: { _id: 1, name: 1, slug: 1 } },
            { $set: { _id: { $toString: '$_id' } } },
          ],
          as: 'category',
        })
        .project({ categoryId: 0 })
        .unwind('$category');
    } else {
      dbQuery.append({ $set: { categoryId: { $toString: '$categoryId' } } });
    }

    const [records, count] = await Promise.all([
      dbQuery
        .append({
          $sort: sort
            ? sort
            : keyword
            ? { relevance: { $meta: 'textScore' } }
            : DEFAULT_DBQUERY_SORT,
        })
        .skip(skip ? skip : DEFAULT_DBQUERY_SKIP)
        .limit(limit ? limit : DEFAULT_DBQUERY_LIMIT)
        .append({
          $set: {
            _id: { $toString: '$_id' },
            // categoryId: { $toString: '$categoryId' },
            // relevance: { $meta: 'textScore' },
          },
        })
        .exec(),
      this.productModel.countDocuments(filters),
    ]);
    return new FindAllResult(records, count);
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

  async deleteMany(dto: DeleteMultiProductDto): Promise<any> {
    const { deletedCount } = await this.productModel.deleteMany({
      _id: { $in: dto.ids },
    });
    return { deletedCount };
  }

  // async deleteMany(ids: string[]): Promise<void> {
  // const foundProducts = await this.productModel.find({
  // _id: { $in: ids },
  // });
  // if (foundProducts.length !== ids.length) {
  // throw new NotFoundException('One or several products do not exist');
  // }

  // const session = await this.dbConnection.startSession();
  // session.startTransaction();
  // try {
  // await Promise.all(
  // foundProducts.map((product) => product.delete({ session })),
  // );
  // await session.commitTransaction();
  // } catch (error) {
  // await session.abortTransaction();
  // throw error;
  // } finally {
  // session.endSession();
  // }
  // }

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

  async increaseSoldQuantity(items: any[]): Promise<void> {
    await this.productModel.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { soldQuantity: Math.abs(item.quantity) } },
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

  async createReview(
    userId: string,
    productId: string,
    dto: ReviewProductDto,
  ): Promise<IReview> {
    return this.reviewService.create(userId, { productId, ...dto });
  }

  async getReviews(id: string): Promise<IReview[]> {
    return await this.reviewService.findByProductId(id);
  }
}

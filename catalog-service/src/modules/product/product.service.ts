import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from './interfaces/product.interface';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import * as slug from 'slug';
import { FindAllProductDto } from './dto/find-all-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findOne(id: string): Promise<IProduct> {
    const foundProduct = await this.productModel.findById(id).exec();
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return foundProduct;
  }

  async findAll(query: FindAllProductDto): Promise<IProduct[]> {
    const { startId, skip, limit, sort } = query;

    const filters: FilterQuery<Product> = startId
      ? {
          _id: { $gt: startId },
        }
      : {};

    const dbQuery = this.productModel
      .find(filters)
      .sort(sort ? sort : { _id: 1 })
      .skip(skip)
      .limit(limit);
    return await dbQuery.exec();
  }

  async create(dto: CreateProductDto): Promise<IProduct> {
    const productName = dto.name;
    // check uniqueness of name
    const productByName = await this.productModel
      .findOne({
        name: productName,
      })
      .exec();
    if (productByName) {
      throw new ConflictException('Product name is already exist');
    }

    const createdProduct = await this.productModel.create({
      ...dto,
      slug: slug(productName),
    });

    return createdProduct;
  }

  async update(id: string, dto: CreateProductDto): Promise<IProduct> {
    const existingProduct = this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    return existingProduct;
  }

  async deleteOne(id: string): Promise<boolean> {
    const foundProduct = await this.productModel.findById(id);
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return (await foundProduct.delete()) && true;
  }
}

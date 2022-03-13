import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICategory } from './interfaces/category.interface';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import * as slug from 'slug';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async findOne(id: string): Promise<ICategory> {
    const foundCategory = await this.categoryModel.findById(id).exec();
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    return foundCategory;
  }

  async findAll(): Promise<ICategory[]> {
    return await this.categoryModel.find().exec();
  }

  async create(dto: CreateCategoryDto): Promise<ICategory> {
    const categoryName = dto.name;
    // check uniqueness of name
    const categoryByName = await this.categoryModel
      .findOne({
        name: categoryName,
      })
      .exec();
    if (categoryByName) {
      throw new ConflictException('Category name is already exist');
    }

    const createdCategory = await this.categoryModel.create({
      ...dto,
      path: categoryName,
      slug: slug(categoryName),
    });

    return createdCategory;
  }

  async update(id: string, dto: CreateCategoryDto): Promise<ICategory> {
    const existingCategory = this.categoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }
    return existingCategory;
  }

  async deleteOne(id: string): Promise<boolean> {
    const foundCategory = await this.categoryModel.findById(id);
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    return (await foundCategory.delete()) && true;
  }
}

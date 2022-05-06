import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import * as slugify from 'slug';
import { FindAllCategoryDto } from './dto/find-all-category.dto';
import { FindOneCategoryDto } from './dto/find-one-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import mongoose from 'mongoose';
import { ProductService } from '../product/product.service';
import { ICategory } from './interfaces/category.interface';
import { FindAllResult } from 'src/common/classes/find-all.result';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async findOne(id: string, query?: FindOneCategoryDto): Promise<ICategory> {
    const dbQuery = this.categoryModel.findById(id).lean();
    if (query?.includeChildren) {
      dbQuery.populate('children', { children: 0 });
    } else {
      dbQuery.select('-children');
    }
    const foundCategory = await dbQuery.exec();
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    foundCategory._id = foundCategory._id.toString();
    if (foundCategory.children) {
      foundCategory.children.forEach((x) => {
        x._id = x._id.toString();
      });
    }
    return foundCategory;
  }

  async findAll(query: FindAllCategoryDto): Promise<FindAllResult<ICategory>> {
    const { startId, skip, limit, sort, slug, includeChildren, isPublic } =
      query;

    const filters: FilterQuery<Category> = startId
      ? {
          _id: { $gt: startId },
        }
      : {};
    slug && (filters.slug = slug);
    isPublic !== undefined && (filters.isPublic = isPublic);

    const dbQuery = this.categoryModel
      .find(filters)
      .lean()
      .sort(sort ? sort : { _id: 1 })
      .skip(skip)
      .limit(limit);

    if (includeChildren === true) {
      dbQuery.populate('children', { children: 0 });
    } else {
      dbQuery.select('-children');
    }

    const [records, count] = [
      await dbQuery,
      await this.categoryModel.countDocuments(filters),
    ];

    records.forEach((category) => {
      category._id = category._id.toString();
      if (category.children) {
        category.children.forEach((x) => {
          x._id = x._id.toString();
        });
      }
    });
    return new FindAllResult(records, count);
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { name, parentId } = dto;

    // check uniqueness of name
    const categoryByName = await this.categoryModel
      .findOne({
        name,
      })
      .lean();
    if (categoryByName) {
      throw new ConflictException('Category name is already exist');
    }

    const slug = slugify(name);

    if (!parentId) {
      return await this.categoryModel.create({ ...dto, path: [name], slug });
    } else {
      const parentCategory = await this.categoryModel.findById(parentId);
      if (!parentCategory) {
        throw new NotFoundException('Parent category is not exist');
      }
      let createdCategory;
      const session = await this.dbConnection.startSession();
      session.startTransaction();
      try {
        // create the category
        createdCategory = (
          await this.categoryModel.create(
            [
              {
                ...dto,
                path: parentCategory.path.concat(name),
                slug,
              },
            ],
            { session },
          )
        )[0];
        // add reference to its parent
        parentCategory.children.push(createdCategory._id);
        await parentCategory.save({ session });

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
      return createdCategory;
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const newName = dto.name;
    const existingCategory = await this.categoryModel.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    const oldName = existingCategory.name;
    Object.assign(existingCategory, dto);

    if (newName === oldName) {
      await existingCategory.save();
    } else {
      existingCategory.slug = slugify(newName);
      const session = await this.dbConnection.startSession();
      session.startTransaction();
      try {
        await existingCategory.save({ session });
        const relatedCategories = await this.categoryModel.find({
          path: oldName,
        });
        await Promise.all(
          relatedCategories.map((category) => {
            category.path = category.path.map((i) =>
              i === oldName ? newName : i,
            );
            return category.save({ session });
          }),
        );
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    }

    return await this.categoryModel.findById(id);
  }

  async deleteOne(id: string): Promise<void> {
    const foundCategory = await this.categoryModel.findById(id);
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    const session = await this.dbConnection.startSession();
    const recursiveDeleteCategory = async (
      category: Category,
    ): Promise<void> => {
      await category.populate('children');
      const children: Category[] = category.children;
      await category.delete({ session });
      try {
        await this.productService.deleteByCategory(category, session);
      } catch (error) {
        throw new InternalServerErrorException(
          `Error while delete products in category ${category.id}`,
        );
      }
      if (children) {
        await Promise.all(
          children.map((children) => recursiveDeleteCategory(children)),
        );
      }
    };

    session.startTransaction();
    try {
      await recursiveDeleteCategory(foundCategory);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Category } from 'src/modules/category/schemas/category.schema';

@Schema()
export class Product extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isEnabled: boolean;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isPublic: boolean;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  originalPrice: number;

  @Prop({
    type: Number,
    required: true,
  })
  stockQuantity: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  soldQuantity: number;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  shortDescription: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: String,
  })
  thumbnail: string;

  @Prop({
    type: [String],
    required: true,
    default: [],
  })
  images: string[];

  @Prop({
    type: String,
    required: true,
  })
  metaTitle: string;

  @Prop({
    type: String,
    required: true,
  })
  metaDescription: string;

  @Prop({
    type: String,
  })
  metaKeywords: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Category.name,
  })
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  name: string;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isPublic: boolean;

  @Prop({
    type: String,
    required: true
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  path: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  slug: string;

  @Prop({
    type: String
  })
  thumbnail: string;

  @Prop({
    type: String,
    required: true
  })
  metaTitle: string;

  @Prop({
    type: String,
    required: true
  })
  metaDescription: string;

  @Prop({
    type: String,
  })
  metaKeywords: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Category.name,
    required: false
  })
  parentId: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

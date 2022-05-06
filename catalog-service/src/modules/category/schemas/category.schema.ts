import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Category extends Document implements ICategory {
  @Prop({
    type: String,
    required: true,
    unique: true,
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
    required: true,
  })
  description: string;

  @Prop({
    type: [String],
    required: true,
  })
  path: string[];

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
    type: [SchemaTypes.ObjectId],
    ref: Category.name,
    required: false,
    default: [],
  })
  children: Category[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Category.name,
    required: false,
    default: null,
  })
  parentId: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ children: 1 });
CategorySchema.index({
  name: 'text',
  metaKeywords: 'text',
});

export { CategorySchema };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Product } from 'src/modules/product/schemas/product.schema';
import { IReview } from '../interfaces/review.interface';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Review extends Document implements IReview {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Product.name,
    required: true,
    index: true,
  })
  productId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  comment: string;

  @Prop({
    type: Number,
    required: false,
    default: null,
  })
  star: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

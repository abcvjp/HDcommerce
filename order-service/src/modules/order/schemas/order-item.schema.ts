import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOrderItem } from '../interfaces/order-item.interface';

@Schema({
  id: false,
  versionKey: false,
  timestamps: true,
})
export class OrderItem extends Document implements IOrderItem {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
    index: true,
  })
  productId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Order',
    required: true,
    index: true,
  })
  orderId: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  productName: string;

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  productThumbnail: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

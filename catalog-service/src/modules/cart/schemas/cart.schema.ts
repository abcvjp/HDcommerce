import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

@Schema({
  _id: false,
})
class CartItem extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: string;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  quantity: number;
}
const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({
  _id: false,
  versionKey: false,
  timestamps: true,
})
export class Cart extends Document implements ICart {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    index: true,
  })
  userId: string;

  @Prop({
    type: Number,
    required: true,
  })
  subTotal: number;

  @Prop({
    type: [CartItemSchema],
    required: true,
    default: [],
  })
  items: CartItem[];
}

const CartSchema = SchemaFactory.createForClass(Cart);

export { CartSchema };

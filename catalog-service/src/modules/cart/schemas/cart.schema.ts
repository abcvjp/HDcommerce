import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ICart } from '../interfaces/cart.interface';

@Schema({
  _id: false,
  versionKey: false,
})
class CartItem extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: string;

  @Prop({
    type: String,
    required: true,
  })
  productName: string;

  @Prop({
    type: String,
    required: true,
  })
  productSlug: string;

  @Prop({
    type: String,
    required: true,
  })
  thumbnail: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  quantity: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  selected: boolean;

  @Prop({
    type: Boolean,
    required: true,
  })
  isBuyable: boolean;
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
    type: [CartItemSchema],
    required: true,
    default: [],
  })
  items: CartItem[];

  @Prop({
    type: Number,
    required: true,
  })
  subTotal: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  isValid: boolean;

  @Prop({
    type: Object,
    required: true,
    default: null,
  })
  messages: Record<string, string[]>;
}

const CartSchema = SchemaFactory.createForClass(Cart);

export { CartSchema };

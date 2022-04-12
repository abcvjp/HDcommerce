import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

export enum OrderStatus {
  CREATING = 'Creating',
  FAILED = 'Failed',
  PENDING = 'Pending',
  HANDLING = 'Handling',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export enum PaymentStatus {
  UNPAID = 'Unpaid',
  PAID = 'Paid',
}

export enum DeliveryStatus {
  UNDELIVERED = 'Undelivered',
  DELIVERING = 'Delivering',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

@Schema()
class OrderItem extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
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

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Order extends Document implements IOrder {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  code: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.CREATING,
  })
  status: OrderStatus;

  @Prop({
    type: Number,
    required: true,
  })
  orderTotal: number;

  @Prop({
    type: Number,
    required: true,
  })
  itemTotal: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  deliveryFee: number;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(DeliveryStatus),
    default: DeliveryStatus.UNDELIVERED,
  })
  deliveryStatus: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.UNPAID,
  })
  paymentStatus: string;

  @Prop(
    raw({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    }),
  )
  customerInfo: Record<string, any>;

  @Prop({
    type: String,
    required: true,
  })
  deliveryMethod: string;

  @Prop({
    type: String,
    required: true,
  })
  paymentMethod: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
  })
  userId: string;

  @Prop({
    type: [OrderItemSchema],
    required: true,
  })
  items: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

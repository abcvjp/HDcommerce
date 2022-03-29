import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

export enum OrderStatus {
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
    default: OrderStatus.PENDING,
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
    required: false,
  })
  userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

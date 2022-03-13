import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

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
export class Order extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  code: string;

  @Prop({
    type: String,
    required: true,
    enum: ['Pending', 'Handling', 'Completed', 'Canceled'],
    default: 'Pending',
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
    enum: ['Undelivered', 'Delivering', 'Success', 'Failed'],
    default: 'Undelivered',
  })
  deliveryStatus: string;

  @Prop({
    type: String,
    required: true,
    enum: ['Unpaid', 'Paid'],
    default: 'Unpaid',
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

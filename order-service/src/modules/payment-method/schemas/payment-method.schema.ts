import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPaymentMethod } from '../interfaces/payment-method.interface';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class PaymentMethod extends Document implements IPaymentMethod {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  detail: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isEnabled: boolean;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

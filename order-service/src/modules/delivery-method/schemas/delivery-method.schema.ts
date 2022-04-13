import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IDeliveryMethod } from '../interfaces/delivery-method.interface';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class DeliveryMethod extends Document implements IDeliveryMethod {
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
    type: Number,
    required: false,
    default: null,
  })
  fixedFee?: number;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isEnabled: boolean;
}

export const DeliveryMethodSchema =
  SchemaFactory.createForClass(DeliveryMethod);

import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISaleReport } from '../interfaces/sale-report.interface';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class SaleReport extends Document implements ISaleReport {
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  orderNumber: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  completedOrder: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  failedOrder: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  productNumber: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  itemNumber: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  orderTotal: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  deliveryFee: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  revenue: number;

  // @Prop({
  // type: Number,
  // required: true,
  // default: 0,
  // })
  // profit: number;

  @Prop({
    type: Date,
    required: true,
  })
  day: Date;
}

export const SaleReportSchema = SchemaFactory.createForClass(SaleReport);

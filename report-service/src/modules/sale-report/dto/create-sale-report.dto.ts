import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleReportDto {
  @IsNotEmpty()
  @IsNumber()
  orderNumber: number;

  @IsNotEmpty()
  @IsNumber()
  completedOrder: number;

  @IsNotEmpty()
  @IsNumber()
  processingOrder: number;

  @IsNotEmpty()
  @IsNumber()
  failedOrder: number;

  @IsNotEmpty()
  @IsNumber()
  productNumber: number;

  @IsNotEmpty()
  @IsNumber()
  itemNumber: number;

  @IsNotEmpty()
  @IsNumber()
  orderTotal: number;

  @IsNotEmpty()
  @IsNumber()
  deliveryFee: number;

  @IsNotEmpty()
  @IsNumber()
  revenue: number;

  @IsNotEmpty()
  @IsNumber()
  profit: number;

  @IsNotEmpty()
  @IsDate()
  day: Date;
}

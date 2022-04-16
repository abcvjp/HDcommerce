import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsNumberFilter } from 'src/common/decorators/is-number-filter.decorator';
import { FindAllDto } from 'src/common/dto/find-all.dto';
import { NumberFilter } from 'src/common/dto/number-filter.dto';
import {
  DeliveryStatus,
  OrderStatus,
  PaymentStatus,
} from '../schemas/order.schema';

export class CustomerInfoDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class FindAllOrderDto extends FindAllDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;

  @IsOptional()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  deliveryMethodId: string;

  @IsOptional()
  @IsMongoId()
  paymentMethodId: string;

  @IsOptional()
  @IsNumberFilter()
  itemTotal: NumberFilter;

  @IsOptional()
  @IsNumberFilter()
  orderTotal: NumberFilter;

  @IsOptional()
  @IsNumberFilter()
  deliveryFee: NumberFilter;

  @IsOptional()
  @Type(() => CustomerInfoDto)
  customerInfo: CustomerInfoDto;
}

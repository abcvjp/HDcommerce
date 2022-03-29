import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  readonly productId: string;

  @IsNotEmpty()
  readonly quantity: number;
}

class CustomerInfoDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];

  @IsNotEmpty()
  @IsString()
  readonly deliveryMethod: string;

  @IsNotEmpty()
  @IsString()
  readonly paymentMethod: string;

  @IsOptional()
  @IsMongoId()
  readonly userId: string;

  @IsNotEmpty()
  @Type(() => CustomerInfoDto)
  readonly customerInfo: CustomerInfoDto;
}

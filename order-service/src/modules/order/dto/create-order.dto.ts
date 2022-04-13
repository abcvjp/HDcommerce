import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

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
  @IsMongoId()
  readonly deliveryMethodId: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly paymentMethodId: string;

  @IsNotEmpty()
  @Type(() => CustomerInfoDto)
  readonly customerInfo: CustomerInfoDto;
}

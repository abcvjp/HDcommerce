import { IsNotEmpty, IsOptional } from 'class-validator';

class OrderItemDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  readonly quantity: number;
}

class CustomerInfoDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  readonly address: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  readonly items: OrderItemDto[];

  @IsNotEmpty()
  readonly deliveryMethod: string;

  @IsNotEmpty()
  readonly paymentMethod: string;

  @IsOptional()
  readonly userId: string;

  @IsNotEmpty()
  readonly customerInfo: CustomerInfoDto;
}

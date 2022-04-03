import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';

export class CartItemDto {
  @IsMongoId()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  price: number;

  @IsBoolean()
  isSelected: boolean;
}

export class UpdateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}

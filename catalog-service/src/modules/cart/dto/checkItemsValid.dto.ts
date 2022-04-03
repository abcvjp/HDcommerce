import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsMongoId,
  Min,
  ValidateNested,
} from 'class-validator';

export class ItemDto {
  @IsMongoId()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CheckItemsValidDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

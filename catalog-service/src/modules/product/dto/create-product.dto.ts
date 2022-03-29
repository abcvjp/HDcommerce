import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsBoolean()
  readonly isEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly originalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  readonly stockQuantity: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly shortDescription: string;

  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsString()
  readonly images: string[];

  @IsNotEmpty()
  @IsString()
  readonly metaTitle: string;

  @IsNotEmpty()
  @IsString()
  readonly metaDescription: string;

  @IsOptional()
  @IsString()
  readonly metaKeywords: string;

  @IsOptional()
  @Type(() => String)
  readonly tags: string[];

  @IsNotEmpty()
  @IsMongoId()
  readonly categoryId: string;
}

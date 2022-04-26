import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsBoolean()
  readonly isEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly originalPrice: number;

  @IsOptional()
  @IsNumber()
  readonly stockQuantity: number;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly shortDescription: string;

  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsString()
  readonly images: string[];

  @IsOptional()
  @IsString()
  readonly metaTitle: string;

  @IsOptional()
  @IsString()
  readonly metaDescription: string;

  @IsOptional()
  @IsString()
  readonly metaKeywords: string;

  @IsOptional()
  @Type(() => String)
  readonly tags: string[];

  @IsOptional()
  @IsMongoId()
  readonly categoryId: string;
}

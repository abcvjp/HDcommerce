import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly isEnabled: boolean;

  @IsOptional()
  readonly isPublic: boolean;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly originalPrice: number;

  @IsNotEmpty()
  readonly stockQuantity: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly shortDescription: string;

  @IsNotEmpty()
  readonly thumbnail: string;

  @IsOptional()
  readonly images: string[];

  @IsNotEmpty()
  readonly metaTitle: string;

  @IsNotEmpty()
  readonly metaDescription: string;

  @IsOptional()
  readonly metaKeywords: string;

  @IsNotEmpty()
  readonly categoryId: string;
}

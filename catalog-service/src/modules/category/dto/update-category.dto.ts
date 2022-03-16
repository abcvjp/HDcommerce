import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly isPublic: boolean;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly thumbnail: string;

  @IsNotEmpty()
  readonly metaTitle: string;

  @IsNotEmpty()
  readonly metaDescription: string;

  @IsOptional()
  readonly metaKeywords: string;
}

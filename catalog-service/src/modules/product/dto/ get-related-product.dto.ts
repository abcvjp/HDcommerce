import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class GetRelatedProductsDto {
  @IsOptional()
  @IsMongoId()
  readonly startId?: string;

  @IsOptional()
  @IsInt()
  readonly skip: number;

  @IsOptional()
  @IsInt()
  readonly limit: number;
}

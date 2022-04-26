import { IsInt, IsMongoId, IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsOptional()
  @IsMongoId()
  readonly startId?: string;

  @IsOptional()
  @IsInt()
  readonly skip: number;

  @IsOptional()
  @IsInt()
  readonly limit: number;

  @IsOptional()
  @IsString()
  readonly sort: string;
}

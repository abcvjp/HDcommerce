import { IsInt, IsMongoId, IsOptional, IsString, Min } from 'class-validator';

export class FindQueryDto {
  @IsOptional()
  @IsMongoId()
  readonly startId?: string;

  @IsOptional()
  @IsInt()
  readonly skip: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly limit: number;

  @IsOptional()
  @IsString()
  readonly sort: string;
}

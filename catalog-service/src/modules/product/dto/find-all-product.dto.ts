import { Transform, Type } from 'class-transformer';
import { IsOptional, IsMongoId, IsString } from 'class-validator';
import { BooleanQuery } from 'src/common/decorators/boolean-query.decorator';
import { IsNumberFilter } from 'src/common/decorators/is-number-filter.decorator';
import { FindAllDto } from 'src/common/dto/find-all.dto';
import { NumberFilter } from 'src/common/dto/number-filter.dto';

export class FindAllProductDto extends FindAllDto {
  @IsOptional()
  @IsMongoId()
  readonly categoryId: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @BooleanQuery()
  readonly isEnabled: boolean;

  @IsOptional()
  @BooleanQuery()
  readonly isPublic: boolean;

  @IsOptional()
  @IsNumberFilter()
  readonly price: NumberFilter;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @Type(() => String)
  readonly tags: string[];

  @IsOptional()
  @IsNumberFilter()
  readonly originalPrice: NumberFilter;

  @IsOptional()
  @IsNumberFilter()
  readonly stockQuantity: NumberFilter;

  @IsOptional()
  @IsNumberFilter()
  readonly soldQuantity: NumberFilter;

  @IsOptional()
  @IsString()
  readonly keyword: string;
}

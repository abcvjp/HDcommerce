import { Transform } from 'class-transformer';
import { IsOptional, IsMongoId, IsBoolean } from 'class-validator';
import { IsNumberFilter } from 'src/common/decorators/is-number-filter.decorator';
import { FindAllDto } from 'src/common/dto/find-all.dto';
import { NumberFilter } from 'src/common/dto/number-filter.dto';

export class FindAllProductDto extends FindAllDto {
  @IsOptional()
  @IsMongoId()
  readonly categoryId: string;

  @IsOptional()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly isEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;

  @IsOptional()
  @IsNumberFilter()
  readonly price: NumberFilter;

  @IsOptional()
  @Transform(({ value }) => value.split(','))
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
}

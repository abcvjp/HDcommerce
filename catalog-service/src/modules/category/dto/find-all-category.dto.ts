import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { BooleanQuery } from 'src/common/decorators/boolean-query.decorator';
import { FindAllDto } from 'src/common/dto/find-all.dto';

export class FindAllCategoryDto extends FindAllDto {
  @IsOptional()
  @IsMongoId()
  readonly parentId: string;

  @IsOptional()
  readonly slug: string;

  @BooleanQuery()
  @IsOptional()
  @IsBoolean()
  readonly includeChildren: boolean;

  @BooleanQuery()
  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;

  @IsOptional()
  @IsString()
  readonly keyword: string;
}

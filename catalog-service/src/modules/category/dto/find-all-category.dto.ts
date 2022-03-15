import { IsMongoId, IsOptional } from 'class-validator';
import { FindAllDto } from 'src/common/dto/find-all.dto';

export class FindAllCategoryDto extends FindAllDto {
  @IsOptional()
  @IsMongoId()
  readonly parentId: string;

  @IsOptional()
  readonly slug: string;
}

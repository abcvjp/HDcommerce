import { IsOptional, IsMongoId } from 'class-validator';
import { FindAllDto } from 'src/common/dto/find-all.dto';

export class FindAllProductDto extends FindAllDto {
  @IsOptional()
  @IsMongoId()
  readonly categoryId: string;
}

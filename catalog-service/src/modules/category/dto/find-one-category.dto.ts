import { IsOptional } from 'class-validator';

export class FindOneCategoryDto {
  @IsOptional()
  readonly includeChildren: boolean;
}

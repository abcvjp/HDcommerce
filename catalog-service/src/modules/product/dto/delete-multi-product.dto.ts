import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeleteMultiProductDto {
  @Transform(({ value }) => value.split(','))
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}

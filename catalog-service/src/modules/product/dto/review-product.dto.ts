import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReviewProductDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  star: number;
}

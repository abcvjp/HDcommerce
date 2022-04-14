import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDeliveryMethodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsOptional()
  @IsNumber()
  fixedFee?: number;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}

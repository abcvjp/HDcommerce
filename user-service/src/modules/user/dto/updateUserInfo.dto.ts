import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import * as moment from 'moment';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsEmail()
  email: string;

  // @IsOptional()
  // role: number;

  // @IsOptional()
  // @IsBoolean()
  // isEnabled: boolean;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsInt()
  gender: number;

  @Transform(({ value }) => moment(value, 'DD/MM/YY').toDate())
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  birthDay: Date;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar: string;
}

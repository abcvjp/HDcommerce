import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import * as moment from 'moment';
import { Gender, UserRole } from '../schemas/user.schema';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: number;

  @IsOptional()
  @IsBoolean()
  isEnabled: boolean;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEnum(Gender)
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
  addresses: string[];

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar: string;
}

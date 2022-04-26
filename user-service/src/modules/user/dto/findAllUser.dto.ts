// import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsEnum, IsDate } from 'class-validator';
import { FindAllDto } from 'src/common/dto/find-all.dto';
import { Gender, UserRole } from '../schemas/user.schema';
// import * as moment from 'moment';
import { BooleanQuery } from 'src/common/decorators/boolean-query.decorator';

export class FindAllUserDto extends FindAllDto {
  @IsOptional()
  @IsEnum(UserRole)
  role: number;

  @BooleanQuery()
  @IsBoolean()
  @IsOptional()
  isEnabled: boolean;

  @IsOptional()
  @IsEnum(Gender)
  gender: number;

  // @Transform(({ value }) => {
  // console.log(value);
  // // return moment(value, 'DD/MM/YY').toDate();
  // })
  @IsOptional()
  @IsDate()
  // @IsDateString()
  birthDay: Date;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;
}

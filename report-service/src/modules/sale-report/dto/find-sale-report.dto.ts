import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { FindAllDto } from 'src/common/dto/find-all.dto';

export class FindSaleReportDto extends FindAllDto {
  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum(['day', 'week', 'month', 'year'])
  type: string;
}

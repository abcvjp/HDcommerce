import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserRole } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FindSaleReportDto } from './dto/find-sale-report.dto';
import { SaleReportService } from './sale-report.service';

@Controller('sale')
export class SaleReportController {
  constructor(private saleReportService: SaleReportService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query() dto: FindSaleReportDto) {
    return this.saleReportService.findAll(dto);
  }

  @Get(':date')
  @Roles(UserRole.ADMIN)
  findOne(@Param('date') date: string) {
    return this.saleReportService.findOne(date);
  }
}

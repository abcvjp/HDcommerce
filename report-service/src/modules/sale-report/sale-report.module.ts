import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleReportController } from './sale-report.controller';
import { SaleReportService } from './sale-report.service';
import { SaleReport, SaleReportSchema } from './schemas/sale-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaleReport.name, schema: SaleReportSchema },
    ]),
  ],
  providers: [SaleReportService],
  controllers: [SaleReportController],
  exports: [SaleReportService],
})
export class SaleReportModule {}

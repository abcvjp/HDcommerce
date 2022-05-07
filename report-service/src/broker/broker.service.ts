import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SaleReportService } from 'src/modules/sale-report/sale-report.service';
import { BORKER_PROVIDER } from './broker.provider';

@Injectable()
export class BrokerService {
  constructor(
    @Inject(BORKER_PROVIDER) private readonly brokerClient: ClientKafka,
    private readonly saleReportService: SaleReportService,
  ) {}

  async handleOrderCreated(data: any) {
    return this.saleReportService.handleOrderCreated(data);
  }

  async handleOrderSucceed(data: any) {
    return this.saleReportService.handleOrderSucceed(data);
  }

  async handleOrderFailed(data: any) {
    return this.saleReportService.handleOrderFailed(data);
  }
}

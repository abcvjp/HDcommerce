import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BrokerService } from './broker.service';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @EventPattern('orderCreation-orderCreated')
  async handleOrderCreated(message: any) {
    await this.brokerService.handleOrderCreated(message.value);
  }

  @EventPattern('orderProcessing-orderCompleted')
  async handleOrderSucceed(message: any) {
    await this.brokerService.handleOrderSucceed(message.value);
  }

  @EventPattern('orderCreation-FAILED')
  async handleOrderFailed(message: any) {
    await this.brokerService.handleOrderFailed(message.value);
  }
}

import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BrokerService } from './broker.service';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @EventPattern('orderCreation-OK')
  async handleOrderCreationSucceed(message: any) {
    const { orderId } = message.value;
    await this.brokerService.handleOrderCreationSucceed(orderId);
  }

  @EventPattern('orderCreation-stockUpdateERR')
  async handleStockUpdateERR(message: any) {
    const { orderId } = message.value;
    await this.brokerService.handleStockUpdateERR(orderId);
  }
}

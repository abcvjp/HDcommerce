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

  @EventPattern('order-completed')
  async handleOrderCompleted(message: any) {
    await this.brokerService.handleOrderCompleted(message.value);
  }
}

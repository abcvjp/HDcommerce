import { Controller } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';
import { BrokerService } from './broker.service';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @EventPattern('orderCreation-orderCreated', Transport.KAFKA)
  async handleOrderCreated(message: any) {
    const { items, orderId } = message.value;
    await this.brokerService.handleOrderCreated(orderId, items);
  }
}

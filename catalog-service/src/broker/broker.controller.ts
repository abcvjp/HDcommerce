import { Controller } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';
import { BrokerService } from './broker.service';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @EventPattern('orderCreation-orderCreated', Transport.KAFKA)
  async handleOrderCreated(message: any) {
    await this.brokerService.handleOrderCreated(message.value);
  }
}

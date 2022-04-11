import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderService } from 'src/modules/order/order.service';
import { BORKER_PROVIDER } from './broker.provider';

@Injectable()
export class BrokerService {
  constructor(
    @Inject(BORKER_PROVIDER) private readonly brokerClient: ClientKafka,
    private readonly orderService: OrderService,
  ) {}

  async handleStockUpdateERR(orderId: string): Promise<void> {
    this.orderService.failOrder(orderId);
  }

  async handleOrderCreationSucceed(orderId: string): Promise<void> {
    console.log(`order ${orderId} created`);
  }
}

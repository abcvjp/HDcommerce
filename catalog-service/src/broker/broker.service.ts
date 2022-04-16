import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ProductService } from 'src/modules/product/product.service';
import { BROKER_PROVIDER } from './broker.provider';

@Injectable()
export class BrokerService {
  constructor(
    @Inject(BROKER_PROVIDER) private readonly brokerClient: ClientKafka,
    private readonly productService: ProductService,
  ) {}

  async handleOrderCreated(orderInfo: any): Promise<void> {
    try {
      await this.productService.decreaseStockQuantity(orderInfo.items);
    } catch (error) {
      await this.brokerClient.emit('orderCreation-stockUpdateERR', orderInfo);
    }
    await this.brokerClient.emit('orderCreation-stockUpdateOK', orderInfo);
  }
}

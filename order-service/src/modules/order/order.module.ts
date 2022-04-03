import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { BrokerModule } from 'src/broker/broker.module';
import { CatalogModule } from 'src/rpc/catalog/catalog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    BrokerModule,
    CatalogModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

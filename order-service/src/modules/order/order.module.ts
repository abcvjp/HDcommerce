import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { BrokerModule } from 'src/broker/broker.module';
import { CatalogModule } from 'src/clients/catalog/catalog.module';
import { OrderItem, OrderItemSchema } from './schemas/order-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    forwardRef(() => BrokerModule),
    CatalogModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

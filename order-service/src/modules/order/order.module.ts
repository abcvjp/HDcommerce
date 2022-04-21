import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { BrokerModule } from 'src/broker/broker.module';
import { CatalogModule } from 'src/clients/catalog/catalog.module';
import { OrderItem, OrderItemSchema } from './schemas/order-item.schema';
import { DeliveryMethodModule } from '../delivery-method/delivery-method.module';
import { PaymentMethodModule } from '../payment-method/payment-method.module';

import { StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import stripeConfig from 'src/config/stripe.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    StripeModule.forRootAsync({
      imports: [ConfigModule.forFeature(stripeConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('stripe.secretKey'),
        apiVersion: '2020-08-27',
      }),
    }),
    forwardRef(() => BrokerModule),
    CatalogModule,
    DeliveryMethodModule,
    PaymentMethodModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

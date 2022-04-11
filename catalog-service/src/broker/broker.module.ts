import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import brokerConfig from 'src/config/broker.config';
import { ProductModule } from 'src/modules/product/product.module';
import { BrokerController } from './broker.controller';
import { BrokerProvider } from './broker.provider';
import { BrokerService } from './broker.service';

@Module({
  imports: [ConfigModule.forFeature(brokerConfig), ProductModule],
  providers: [BrokerProvider, BrokerService],
  controllers: [BrokerController],
  exports: [BrokerProvider, BrokerService],
})
export class BrokerModule {}

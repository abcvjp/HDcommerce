import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import brokerConfig from 'src/config/broker.config';
import { BrokerController } from './broker.controller';
import { BrokerProvider } from './broker.provider';
import { BrokerService } from './broker.service';

@Module({
  imports: [ConfigModule.forFeature(brokerConfig)],
  providers: [BrokerProvider, BrokerService],
  controllers: [BrokerController],
  exports: [BrokerProvider, BrokerService],
})
export class BrokerModule {}

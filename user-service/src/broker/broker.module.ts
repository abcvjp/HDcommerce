import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import brokerConfig from 'src/config/broker.config';
import { BrokerProvider } from './broker.provider';

@Module({
  imports: [ConfigModule.forFeature(brokerConfig)],
  providers: [BrokerProvider],
  exports: [BrokerProvider],
})
export class BrokerModule {}

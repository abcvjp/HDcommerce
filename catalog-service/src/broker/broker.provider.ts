import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const BROKER_PROVIDER = 'BROKER_PROVIDER';
export const BrokerProvider = {
  provide: BROKER_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const options = configService.get('broker');
    return ClientProxyFactory.create({ transport: Transport.KAFKA, options });
  },
  inject: [ConfigService],
};

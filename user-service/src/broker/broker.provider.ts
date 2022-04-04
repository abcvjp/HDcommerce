import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const BROKER_SERVICE = 'BROKER_SERVICE';
export const BrokerProvider = {
  provide: BROKER_SERVICE,
  useFactory: (configService: ConfigService) => {
    const options = configService.get('broker');
    return ClientProxyFactory.create({ transport: Transport.KAFKA, options });
  },
  inject: [ConfigService],
};

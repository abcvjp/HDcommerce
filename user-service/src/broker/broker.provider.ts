import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const BORKER_PROVIDER = 'BORKER_PROVIDER';
export const BrokerProvider = {
  provide: BORKER_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const options = configService.get('broker');
    return ClientProxyFactory.create({ transport: Transport.KAFKA, options });
  },
  inject: [ConfigService],
};

import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const CATALOG_SERVICE = 'CATALOG_SERVICE';
export const CatalogProvider = {
  provide: CATALOG_SERVICE,
  useFactory: (configService: ConfigService) => {
    const options = configService.get('rpc.catalog');
    return ClientProxyFactory.create({ transport: Transport.TCP, options });
  },
  inject: [ConfigService],
};

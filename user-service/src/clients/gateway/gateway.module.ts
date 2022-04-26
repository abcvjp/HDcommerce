import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import httpClientConfig from 'src/config/http-client.config';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    ConfigModule.forFeature(httpClientConfig),
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(httpClientConfig)],
      useFactory: async (configService: ConfigService) => {
        const { timeout, maxRedirects, clients } =
          configService.get('httpClient');
        return {
          timeout,
          maxRedirects,
          baseURL: clients.gateway.baseURL,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [GatewayService],
  exports: [GatewayService],
})
export class GatewayModule {}

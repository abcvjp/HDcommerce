import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import httpClientConfig from 'src/config/http-client.config';
import { CatalogService } from './catalog.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(httpClientConfig)],
      useFactory: async (configService: ConfigService) => {
        const { timeout, maxRedirects, clients } =
          configService.get('httpClient');
        return {
          timeout,
          maxRedirects,
          baseURL: clients.catalogService.baseURL,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}

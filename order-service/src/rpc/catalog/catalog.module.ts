import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rpcConfig from 'src/config/rpc.config';
import { CatalogProvider } from './catalog.provider';

@Module({
  imports: [ConfigModule.forFeature(rpcConfig)],
  providers: [CatalogProvider],
  exports: [CatalogProvider],
})
export class CatalogModule {}

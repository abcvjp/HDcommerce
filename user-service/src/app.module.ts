import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';

import { DatabaseModule } from './database';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { ResponseSerializator } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RPCExceptionFilter } from './common/filters/rpc-exception.filter';
import { SortQueryParamPipe } from './common/pipes/sort-query-param.pipe';
import brokerConfig from './config/broker.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, brokerConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: SortQueryParamPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSerializator,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RPCExceptionFilter,
    },
  ],
})
export class AppModule {}

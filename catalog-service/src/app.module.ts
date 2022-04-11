import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';

import { DatabaseModule } from './database';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { ResponseSerializator } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RPCExceptionFilter } from './common/filters/rpc-exception.filter';
import { SortQueryParamPipe } from './common/pipes/sort-query-param.pipe';
import brokerConfig from './config/broker.config';
import { CartModule } from './modules/cart/cart.module';
import { RolesGuards } from './common/guards/roles.guard';
import { UserModule } from './clients/user/user.module';
import { UserMiddleware } from './common/middlewares/user.middleware';
import { BrokerModule } from './broker/broker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, brokerConfig],
    }),
    DatabaseModule,
    CategoryModule,
    ProductModule,
    CartModule,
    UserModule,
    BrokerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuards,
    },
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

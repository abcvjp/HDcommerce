import {
  Global,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrokerModule } from 'src/broker/broker.module';
import { GatewayModule } from 'src/clients/gateway/gateway.module';
import { UserMiddleware } from 'src/common/middlewares/user.middleware';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BrokerModule,
    GatewayModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: '/me',
      method: RequestMethod.GET,
    });
  }
}

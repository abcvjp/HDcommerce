import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrokerModule } from 'src/broker/broker.module';
import { GatewayModule } from 'src/clients/gateway/gateway.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
export class UserModule {}

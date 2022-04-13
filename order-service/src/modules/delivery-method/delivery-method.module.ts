import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeliveryMethod,
  DeliveryMethodSchema,
} from './schemas/delivery-method.schema';
import { DeliveryMethodService } from './delivery-method.service';
import { DeliveryMethodController } from './delivery-method.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryMethod.name, schema: DeliveryMethodSchema },
    ]),
  ],
  providers: [DeliveryMethodService],
  controllers: [DeliveryMethodController],
  exports: [DeliveryMethodService],
})
export class DeliveryMethodModule {}

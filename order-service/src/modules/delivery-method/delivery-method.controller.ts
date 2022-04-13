import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { DeliveryMethodService } from './delivery-method.service';
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery-method.dto';

@Controller('delivery-method')
export class DeliveryMethodController {
  constructor(private deliveryMethodService: DeliveryMethodService) {}

  @Get()
  findAll() {
    return this.deliveryMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryMethodService.findOne(id);
  }

  @Post()
  create(@UserId() userId: string, @Body() dto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDeliveryMethodDto) {
    return this.deliveryMethodService.update(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.deliveryMethodService.deleteOne(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRole } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
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
  @Roles(UserRole.ADMIN)
  create(@UserId() userId: string, @Body() dto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.create(dto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateDeliveryMethodDto) {
    return this.deliveryMethodService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteOne(@Param('id') id: string) {
    return this.deliveryMethodService.deleteOne(id);
  }
}

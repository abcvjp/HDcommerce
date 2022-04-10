import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { BROKER_SERVICE } from 'src/broker/broker.provider';
import { UserId } from 'src/common/decorators/user-id.decorator';

@Controller('')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject(BROKER_SERVICE) private readonly brokerClient: ClientKafka,
  ) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@UserId() userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(userId, createOrderDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.orderService.deleteOne(id);
  }
}

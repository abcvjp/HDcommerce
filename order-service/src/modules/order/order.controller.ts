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
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get()
  findAll() {
    return this.productClient.send('get_products', {});
    // return this.orderService.findAll();
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.orderService.deleteOne(id);
  }

  @Get('test-service')
  testService() {
    return this.productClient.send('get_products', null);
  }
}
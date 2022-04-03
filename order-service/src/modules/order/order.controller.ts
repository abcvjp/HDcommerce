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
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BROKER_SERVICE } from 'src/broker/broker.provider';
import { CATALOG_SERVICE } from 'src/rpc/catalog/catalog.provider';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject(CATALOG_SERVICE) private catalogClient: ClientProxy,
    @Inject(BROKER_SERVICE) private readonly brokerClient: ClientKafka,
  ) {}

  @Get('test-service')
  async testService() {
    let result;
    try {
      result = await firstValueFrom(
        this.catalogClient.send('get_product', '624289acf909f74bc92b3fd7'),
      );
      await this.brokerClient.emit('test_event', 'hoai dep trai');
    } catch (err) {
      console.log('loi roi');
      console.log(err);
    }
    console.log(result);
    return result;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
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
}

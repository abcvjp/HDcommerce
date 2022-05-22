import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/constants';
import { FindAllOrderDto } from './dto/find-all-order.dto';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { PayWithStripeDto } from './dto/pay-with-stripe.dto';

@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/:id/confirm')
  @Roles(UserRole.ADMIN)
  confirm(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.confirm(id);
  }

  @Get('/:id/complete')
  @Roles(UserRole.ADMIN)
  complete(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.complete(id);
  }

  @Get('/:id/cancel')
  @Roles(UserRole.ADMIN)
  cancel(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.cancel(id);
  }

  @Get('/card-token')
  createCardToken() {
    return this.orderService.createCardToken();
  }

  @Get('/:id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query() dto: FindAllOrderDto) {
    return this.orderService.findAll(dto);
  }

  @Post(':id/payment')
  payWithStripe(
    @Param('id', MongoIdPipe) id: string,
    @Body() dto: PayWithStripeDto,
  ) {
    return this.orderService.payWithStripe(id, dto);
  }

  @Post()
  create(@UserId() userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(userId, createOrderDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateOrderDto: CreateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteOne(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.deleteOne(id);
  }
}

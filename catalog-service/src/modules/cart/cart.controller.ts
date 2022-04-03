import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { ICart } from './interfaces/cart.interface';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { UpdateCartDto } from './dto/updateCart.dto';
import { CheckItemsValidDto } from './dto/checkItemsValid.dto';

@Controller('cart')
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('')
  findOne(@Query('userId', MongoIdPipe) userId: string): Promise<ICart> {
    return this.cartService.findByUserId(userId);
  }

  @Get('check-valid')
  checkItemsValid(@Body() dto: CheckItemsValidDto): Promise<boolean> {
    return this.cartService.checkItemsValid(dto);
  }

  @Put('')
  updateCart(@Body() dto: UpdateCartDto): Promise<any> {
    return this.cartService.updateCart(dto);
  }
}

import { Body, Controller, Get, Put, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { ICart } from './interfaces/cart.interface';
import { UpdateCartDto } from './dto/updateCart.dto';
import { CheckItemsValidDto } from './dto/checkItemsValid.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';

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
  findOne(@UserId() userId: string): Promise<ICart> {
    return this.cartService.findByUserId(userId);
  }

  @Get('check-valid')
  checkItemsValid(@Body() dto: CheckItemsValidDto): Promise<boolean> {
    return this.cartService.checkItemsValid(dto);
  }

  @Put('')
  updateCart(@UserId() userId, @Body() dto: UpdateCartDto): Promise<any> {
    return this.cartService.updateCart(userId, dto);
  }
}

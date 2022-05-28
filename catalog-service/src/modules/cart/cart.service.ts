import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { Product } from '../product/schemas/product.schema';
import { CheckItemsValidDto } from './dto/checkItemsValid.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { ICart } from './interfaces/cart.interface';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    private readonly productService: ProductService,
  ) {}

  async findByUserId(userId: string): Promise<ICart> {
    const foundCart = await this.cartModel.findOne({ userId }, { userId: 0 });
    if (!foundCart) {
      return null;
    }
    return foundCart;
  }

  async updateCart(userId: string, dto: UpdateCartDto) {
    const { items } = dto;

    const productsFromDb = await this.productService.findByIds(
      items.map((item) => item.productId),
    );

    // build a dict for products from db
    const producsFromDbDict: Record<string, Product> = {};
    productsFromDb.forEach((product) => {
      producsFromDbDict[product._id] = product;
    });

    // CHECK AND UPDATE
    const messages: Record<number, string[]> = {};
    let subTotal = 0;
    const updatedItems = items.map((item, i) => {
      const messageBuffer = []; // init error buffer
      const updatedItem: Record<string, any> = {}; // init upldated item result
      Object.assign(updatedItem, item);
      const productFromDb = producsFromDbDict[item.productId]; // get server product to compare
      updatedItem.isBuyable = true; // init isBuyable var

      if (!productFromDb) {
        messageBuffer.push('Product is no longer exist');
        updatedItem.isBuyable = false;
      } else {
        if (!productFromDb.isEnabled) {
          messageBuffer.push('Product is disabled');
          updatedItem.isBuyable = false;
        }
        if (productFromDb.stockQuantity === 0) {
          messageBuffer.push('Product is sold out');
          updatedItem.isBuyable = false;
        } else if (productFromDb.stockQuantity < item.quantity) {
          messageBuffer.push(
            `You can only buy up to ${productFromDb.stockQuantity} products`,
          );
          updatedItem.quantity = productFromDb.stockQuantity;
        }
        if (productFromDb.price !== item.price) {
          messageBuffer.push(
            `Price of product has been changed, you should check again`,
          );
          updatedItem.price = productFromDb.price;
        }
        updatedItem.thumbnail = productFromDb.thumbnail;
        updatedItem.productName = productFromDb.name;
        updatedItem.productSlug = productFromDb.slug;
      }

      if (messageBuffer.length > 0) messages[i] = messageBuffer;
      if (!updatedItem.isBuyable && item.selected) updatedItem.selected = false;
      if (updatedItem.selected && updatedItem.isBuyable)
        subTotal += updatedItem.price * updatedItem.quantity;

      return updatedItem;
    });

    const newCart = {
      messages: Object.keys(messages).length > 0 ? messages : null,
      items: updatedItems,
      subTotal,
    };

    this.cartModel.findOneAndUpdate({ userId }, { userId, ...newCart }, { upsert: true }).exec();

    return newCart;
  }

  async checkItemsValid(dto: CheckItemsValidDto): Promise<any> {
    const { items } = dto;

    const productsFromDb = await this.productService.findByIds(
      items.map((item) => item.productId),
    );

    if (productsFromDb.length !== items.length) return { isValid: false };

    // build a dict for products from db
    const producsFromDbDict: Record<string, Product> = {};
    productsFromDb.forEach((product) => {
      producsFromDbDict[product._id] = product;
    });

    let subTotal = 0;
    const orderItems = [];

    const isValid = items.every((item) => {
      const productFromDb = producsFromDbDict[item.productId];

      subTotal += productFromDb.price * item.quantity;
      orderItems.push({
        productId: productFromDb._id.toString(),
        productName: productFromDb.name,
        productThumbnail: productFromDb.thumbnail,
        price: productFromDb.price,
        quantity: item.quantity,
      });

      if (
        !productFromDb.isEnabled ||
        productFromDb.stockQuantity === 0 ||
        productFromDb.stockQuantity < item.quantity
      )
        return false;
      return true;
    });

    return isValid ? { isValid, subTotal, items: orderItems } : { isValid };
  }
}

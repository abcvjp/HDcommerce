import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { Product } from '../product/schemas/product.schema';
import { CheckItemsValidDto } from './dto/checkItemsValid.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    private readonly productService: ProductService,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const foundCart = await this.cartModel.findOne({ userId }, { userId: 0 });
    if (!foundCart) {
      return null;
    }
    return foundCart;
  }

  async updateCart(dto: UpdateCartDto) {
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
      if (!updatedItem.isBuyable && item.isSelected)
        updatedItem.isSelected = false;
      if (updatedItem.isSelected && updatedItem.isBuyable)
        subTotal += updatedItem.price;

      return updatedItem;
    });

    return { messages, updatedItems, subTotal };
  }

  async checkItemsValid(dto: CheckItemsValidDto): Promise<boolean> {
    const { items } = dto;

    const productsFromDb = await this.productService.findByIds(
      items.map((item) => item.productId),
    );

    if (productsFromDb.length !== items.length) return false;

    // build a dict for products from db
    const producsFromDbDict: Record<string, Product> = {};
    productsFromDb.forEach((product) => {
      producsFromDbDict[product._id] = product;
    });

    return items.every((item) => {
      const productFromDb = producsFromDbDict[item.productId];
      if (
        !productFromDb.isEnabled ||
        productFromDb.stockQuantity === 0 ||
        productFromDb.stockQuantity < item.quantity
      )
        return false;
      return true;
    });
  }
}

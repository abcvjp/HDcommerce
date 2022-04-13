import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IOrder } from './interfaces/order.interface';
import {
  DeliveryStatus,
  Order,
  OrderStatus,
  PaymentStatus,
} from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { CatalogService } from 'src/clients/catalog/catalog.service';

import * as shortid from 'shortid';
import mongoose from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { BORKER_PROVIDER } from 'src/broker/broker.provider';
import { OrderItem } from './schemas/order-item.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(OrderItem.name)
    private readonly orderItemModel: Model<OrderItem>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    @Inject(BORKER_PROVIDER) private readonly brokerClient: ClientKafka,
    private readonly catalogService: CatalogService,
  ) {}

  async findOne(id: string): Promise<IOrder> {
    const foundOrder = await this.orderModel.findById(id).exec();
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }
    return foundOrder;
  }

  async findAll(): Promise<IOrder[]> {
    return await this.orderModel.find().exec();
  }

  async create(userId: string, dto: CreateOrderDto): Promise<IOrder> {
    const { isValid, subTotal, items } = (
      await this.catalogService.checkItemsValid(dto.items)
    ).data;
    if (!isValid)
      throw new NotAcceptableException('Items are not valid to order');

    const code = shortid.generate();

    let createdOrder;
    const session = await this.dbConnection.startSession();
    session.startTransaction();
    try {
      createdOrder = (
        await this.orderModel.create(
          [
            {
              ...dto,
              code,
              itemTotal: subTotal,
              orderTotal: subTotal,
              userId,
              items,
            },
          ],
          { session },
        )
      )[0];
      await this.orderItemModel.bulkWrite(
        items.map((item) => ({
          insertOne: {
            document: { ...item, orderId: createdOrder._id, userId },
          },
        })),
      );
      await this.brokerClient.emit('orderCreation-orderCreated', {
        orderId: createdOrder._id,
        items: dto.items,
      });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    return createdOrder;
  }

  async update(id: string, dto: CreateOrderDto): Promise<IOrder> {
    const existingOrder = this.orderModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }
    return existingOrder;
  }

  async deleteOne(id: string): Promise<void> {
    const foundOrder = await this.orderModel.findById(id);
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }
    await foundOrder.delete();
  }

  async confirmOrder(id: string): Promise<void> {
    const foundOrder = await this.orderModel.findById(id);
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }

    const { status } = foundOrder;

    if (status === OrderStatus.CANCELED) {
      throw new ConflictException('Order is canceled');
    } else if (status !== OrderStatus.PENDING) {
      throw new ConflictException('Order is already confirmed');
    }

    await foundOrder.update({ status: OrderStatus.HANDLING });
  }

  async completeOrder(id: string): Promise<void> {
    const foundOrder = await this.orderModel.findById(id);
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }

    const { status } = foundOrder;

    if (status === OrderStatus.PENDING) {
      throw new ConflictException('Order is not confirm yet');
    }
    if (status === OrderStatus.COMPLETED) {
      throw new ConflictException('Order is already completed');
    }
    if (status === OrderStatus.CANCELED) {
      throw new ConflictException('Order is canceled');
    }

    await foundOrder.update({
      status: OrderStatus.COMPLETED,
      deliveryStatus: DeliveryStatus.SUCCESS,
      paymentStatus: PaymentStatus.PAID,
    });
  }

  async cancelOrder(id: string): Promise<void> {
    const foundOrder = await this.orderModel.findById(id);
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }

    const { status } = foundOrder;

    if (status === OrderStatus.CANCELED) {
      throw new ConflictException('Order is already canceled');
    }
    if (status === OrderStatus.COMPLETED) {
      throw new ConflictException('Can not cancel a completed order');
    }

    await foundOrder.update({ status: OrderStatus.CANCELED });
  }

  async failOrder(id: string): Promise<void> {
    await this.orderModel.updateOne(
      { _id: id },
      { status: OrderStatus.FAILED },
    );
  }
}

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
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { DeliveryMethodService } from '../delivery-method/delivery-method.service';
import { FindAllOrderDto } from './dto/find-all-order.dto';
import {
  DEFAULT_DBQUERY_LIMIT,
  DEFAULT_DBQUERY_SORT,
} from 'src/common/constants';
import { mapKeys } from 'lodash';
import { FindAllResult } from 'src/common/classes/find-all.result';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(OrderItem.name)
    private readonly orderItemModel: Model<OrderItem>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    @Inject(BORKER_PROVIDER) private readonly brokerClient: ClientKafka,
    private readonly catalogService: CatalogService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly deliveryMethodService: DeliveryMethodService,
  ) {}

  async findOne(id: string): Promise<IOrder> {
    const foundOrder = await this.orderModel.findById(id).exec();
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }
    return foundOrder;
  }

  async findAll(dto: FindAllOrderDto): Promise<FindAllResult<IOrder>> {
    const {
      startId,
      skip,
      limit,
      sort,
      id,
      code,
      userId,
      deliveryMethodId,
      paymentMethodId,
      status,
      paymentStatus,
      deliveryStatus,
      itemTotal,
      orderTotal,
      deliveryFee,
      customerInfo,
    } = dto;

    const filters = [];
    startId && filters.push({ _id: { $gt: startId } });
    id && filters.push({ id: new mongoose.Types.ObjectId(id) });
    code && filters.push({ code });
    userId && filters.push({ userId: new mongoose.Types.ObjectId(userId) });
    deliveryMethodId &&
      filters.push({
        deliveryMethodId: new mongoose.Types.ObjectId(deliveryMethodId),
      });
    paymentMethodId &&
      filters.push({
        deliveryMethodId: new mongoose.Types.ObjectId(paymentMethodId),
      });
    status && filters.push({ status });
    paymentStatus && filters.push({ paymentStatus });
    deliveryStatus && filters.push({ deliveryStatus });
    itemTotal && filters.push({ itemTotal: itemTotal.toMongooseFormat() });
    orderTotal && filters.push({ orderTotal: orderTotal.toMongooseFormat() });
    deliveryFee &&
      filters.push({ deliveryFee: deliveryFee.toMongooseFormat() });
    customerInfo &&
      filters.push(
        mapKeys(customerInfo, (value, key) => `customerInfo.${key}`),
      );

    const dbQuery = this.orderModel.aggregate();

    filters.length !== 0 && dbQuery.match({ $and: filters });

    const [records, count] = await Promise.all([
      dbQuery
        .skip(skip ? skip : 0)
        .limit(limit ? limit : DEFAULT_DBQUERY_LIMIT)
        .append({
          $set: {
            _id: { $toString: '$_id' },
            userId: { $toString: '$userId' },
            deliveryMethodId: { $toString: '$deliveryMethodId' },
            paymentMethodId: { $toString: '$paymentMethodId' },
          },
        })
        .append({
          $sort: sort ? sort : DEFAULT_DBQUERY_SORT,
        })
        .exec(),
      this.orderModel.countDocuments(filters),
    ]);
    return new FindAllResult(records, count);
  }

  async create(userId: string, dto: CreateOrderDto): Promise<IOrder> {
    const [itemsCheckResult, deliveryMethod, paymentMethod] = await Promise.all(
      [
        this.catalogService.checkItemsValid(dto.items),
        this.deliveryMethodService.findOne(dto.deliveryMethodId),
        this.paymentMethodService.findOne(dto.paymentMethodId),
      ],
    );
    const { isValid, subTotal, items } = itemsCheckResult;
    if (!isValid)
      throw new NotAcceptableException('Items are not valid to order');

    const code = shortid.generate();

    let createdOrder: Order;
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
              deliveryFee: deliveryMethod.fixedFee
                ? deliveryMethod.fixedFee
                : 0,
              userId,
              deliveryMethodId: deliveryMethod._id,
              paymentMethodId: paymentMethod._id,
              items,
            },
          ],
          { session },
        )
      )[0];
      this.orderItemModel.bulkWrite(
        items.map((item) => ({
          insertOne: {
            document: { ...item, orderId: createdOrder._id, userId },
          },
        })),
      );
      await this.brokerClient.emit('orderCreation-orderCreated', {
        orderId: createdOrder._id.toString(),
        code: createdOrder.code,
        items: createdOrder.items,
        userId: createdOrder.userId,
        deliveryMethod,
        paymentMethod,
        customerInfo: createdOrder.customerInfo,
        deliveryFee: createdOrder.deliveryFee,
        itemTotal: createdOrder.itemTotal,
        orderTotal: createdOrder.orderTotal,
        createdAt: createdOrder.createdAt,
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

  async confirm(id: string): Promise<void> {
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

  async complete(id: string): Promise<void> {
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

  async cancel(id: string): Promise<void> {
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

  async pendingOrder(id: string): Promise<void> {
    await this.orderModel.updateOne(
      { _id: id },
      { status: OrderStatus.PENDING },
    );
  }
}

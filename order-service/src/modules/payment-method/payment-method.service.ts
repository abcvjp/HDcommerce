import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { IPaymentMethod } from './interfaces/payment-method.interface';
import { PaymentMethod } from './schemas/payment-method.schema';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodModel: Model<PaymentMethod>,
  ) {}

  async findOne(id: string): Promise<IPaymentMethod> {
    const foundOrder = await this.paymentMethodModel.findById(id).lean();
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }
    return foundOrder;
  }

  async findAll(): Promise<IPaymentMethod[]> {
    return await this.paymentMethodModel.find().exec();
  }

  async create(dto: CreatePaymentMethodDto): Promise<IPaymentMethod> {
    return await this.paymentMethodModel.create(dto);
  }

  async update(
    id: string,
    dto: UpdatePaymentMethodDto,
  ): Promise<IPaymentMethod> {
    const existingOrder = this.paymentMethodModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }
    return existingOrder;
  }

  async deleteOne(id: string): Promise<void> {
    const foundOrder = await this.paymentMethodModel.findById(id);
    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }
    await foundOrder.delete();
  }
}

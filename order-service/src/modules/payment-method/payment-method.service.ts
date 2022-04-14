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
    const foundPaymentMethod = await this.paymentMethodModel
      .findById(id)
      .lean();
    if (!foundPaymentMethod) {
      throw new NotFoundException('PaymentMethod not found');
    }
    return foundPaymentMethod;
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
    const existingPaymentMethod = this.paymentMethodModel.findByIdAndUpdate(
      id,
      dto,
      {
        new: true,
      },
    );
    if (!existingPaymentMethod) {
      throw new NotFoundException('PaymentMethod not found');
    }
    return existingPaymentMethod;
  }

  async deleteOne(id: string): Promise<void> {
    const foundPaymentMethod = await this.paymentMethodModel.findById(id);
    if (!foundPaymentMethod) {
      throw new NotFoundException('PaymentMethod not found');
    }
    await foundPaymentMethod.delete();
  }
}

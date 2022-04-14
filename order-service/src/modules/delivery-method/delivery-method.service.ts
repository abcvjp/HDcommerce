import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery-method.dto';
import { IDeliveryMethod } from './interfaces/delivery-method.interface';
import { DeliveryMethod } from './schemas/delivery-method.schema';

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodModel: Model<DeliveryMethod>,
  ) {}

  async findOne(id: string): Promise<IDeliveryMethod> {
    const foundDeliveryMethod = await this.deliveryMethodModel
      .findById(id)
      .lean();
    if (!foundDeliveryMethod) {
      throw new NotFoundException('Delivery method not found');
    }
    return foundDeliveryMethod;
  }

  async findAll(): Promise<IDeliveryMethod[]> {
    return await this.deliveryMethodModel.find().exec();
  }

  async create(dto: CreateDeliveryMethodDto): Promise<IDeliveryMethod> {
    return await this.deliveryMethodModel.create(dto);
  }

  async update(
    id: string,
    dto: UpdateDeliveryMethodDto,
  ): Promise<IDeliveryMethod> {
    const existingDeliveryMethod = this.deliveryMethodModel.findByIdAndUpdate(
      id,
      dto,
      {
        new: true,
      },
    );
    if (!existingDeliveryMethod) {
      throw new NotFoundException('DeliveryMethod not found');
    }
    return existingDeliveryMethod;
  }

  async deleteOne(id: string): Promise<void> {
    const foundDeliveryMethod = await this.deliveryMethodModel.findById(id);
    if (!foundDeliveryMethod) {
      throw new NotFoundException('DeliveryMethod not found');
    }
    await foundDeliveryMethod.delete();
  }
}

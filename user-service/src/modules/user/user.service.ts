import { Model } from 'mongoose';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { IUser } from './interfaces/user.interface';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	async findOne(id: string): Promise<IUser> {
    const foundUser = await this.userModel.findById(id, { passwordHash: 0 }).lean();
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().lean();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(dto);

    return createdUser;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

	async updateInfo(id: string, dto: UpdateUserInfoDto): Promise<IUser> {
    const updatedUser = this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).lean();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteOne(id: string): Promise<void> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    await existingUser.delete();
  }
}
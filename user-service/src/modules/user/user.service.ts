import { Model, FilterQuery } from 'mongoose';
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { IUser } from './interfaces/user.interface';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';
import { ClientKafka } from '@nestjs/microservices';
import { FindAllUserDto } from './dto/findAllUser.dto';
import {
  DEFAULT_DBQUERY_LIMIT,
  DEFAULT_DBQUERY_SKIP,
} from 'src/common/constants';
import { GatewayService } from 'src/clients/gateway/gateway.service';
import { comparePassword, hashPassword } from 'src/utils/password';
import mongoose from 'mongoose';
import { BORKER_PROVIDER } from 'src/broker/broker.provider';
import { FindAllResult } from 'src/common/classes/find-all.result';
// import * as moment from 'moment';
import { merge } from 'lodash';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    @Inject(BORKER_PROVIDER) private readonly brokerClient: ClientKafka,
    private readonly gatewayService: GatewayService,
  ) {}

  async findOne(id: string): Promise<IUser> {
    const foundUser = await this.userModel
      .findById(id, { passwordHash: 0 })
      .lean();
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async findAll(query: FindAllUserDto): Promise<FindAllResult<IUser>> {
    const {
      startId,
      skip,
      limit,
      sort,
      isEnabled,
      role,
      gender,
      birthDay,
      startDate,
      endDate,
    } = query;

    const filter: FilterQuery<User> = {};
    startId && (filter._id = { $gt: startId });
    isEnabled !== undefined && (filter.isEnabled = isEnabled);
    role && (filter.role = role);
    gender && (filter.gender = gender);
    birthDay && (filter.birthDay = birthDay);
    startDate && (filter.createdAt = { $gte: startDate });
    endDate && (filter.createdAt = merge(filter.createdAt, { $lte: endDate }));

    const [records, count] = await Promise.all([
      this.userModel
        .find(filter, { passwordHash: 0 })
        .sort(sort ? sort : { _id: 1 })
        .skip(skip ? skip : DEFAULT_DBQUERY_SKIP)
        .limit(limit ? limit : DEFAULT_DBQUERY_LIMIT)
        .lean(),
      this.userModel.countDocuments(filter),
    ]);
    return new FindAllResult(records, count);
  }

  async findByEmail(email: string): Promise<IUser> {
    const foundUser = await this.userModel.findOne({ email }).lean();
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    // const birthDay = moment(dto.birthDay).format('DD/MM/YYYY');
    const { email, password, phoneNumber } = dto;

    // check uniqueness of email, phoneNumber
    const userByEmailOrPhoneNumber = await this.userModel
      .findOne({
        $or: [{ email }, { phoneNumber }],
      })
      .lean();
    if (userByEmailOrPhoneNumber) {
      throw new ConflictException('Email or phoneNumber is already registered');
    }

    const session = await this.dbConnection.startSession();
    session.startTransaction();
    let createdUser;
    try {
      createdUser = (
        await this.userModel.create(
          [
            {
              ...dto,
              passwordHash: await hashPassword(password),
            },
          ],
          { session },
        )
      )[0].toObject();
      await this.gatewayService.createConsumer(
        createdUser.email,
        createdUser._id,
      );
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    // .pipe(map((res) => res.data));
    // console.log(await firstValueFrom(response));
    const { passwordHash, ...result } = createdUser; // eslint-disable-line
    await this.brokerClient.emit('user_created', result);

    return result;
  }

  async update(id: string, dto: UpdateUserDto): Promise<IUser> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .lean();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash, ...result } = updatedUser; // eslint-disable-line

    return result;
  }

  async updateInfo(id: string, dto: UpdateUserInfoDto): Promise<IUser> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
        passwordHash: 0,
      })
      .lean();
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

  async enable(id: string): Promise<void> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { isEnabled: true },
        {
          new: true,
          passwordHash: 0,
        },
      )
      .lean();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
  }

  async disable(id: string): Promise<void> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { isEnabled: false },
        {
          new: true,
          passwordHash: 0,
        },
      )
      .lean();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
  }

  async changePassword(id: string, dto: ChangePasswordDto): Promise<void> {
    const userToChange = await this.userModel.findById(id);
    if (!userToChange) {
      throw new NotFoundException('User not found');
    }
    if (
      !(await comparePassword(dto.currentPassword, userToChange.passwordHash))
    ) {
      throw new ForbiddenException('Current password is wrong');
    }
    await userToChange.update({
      passwordHash: await hashPassword(dto.newPassword),
    });
  }
}

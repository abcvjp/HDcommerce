import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { FindAllUserDto } from './dto/findAllUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';
import { IUser } from './interfaces/user.interface';
import { UserRole } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  findMe(@User() user: IUser) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query() query: FindAllUserDto) {
    return this.userService.findAll(query);
  }

  @Post('')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id/info')
  updateInfo(@Param('id') id: string, @Body() dto: UpdateUserInfoDto) {
    return this.userService.updateInfo(id, dto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}

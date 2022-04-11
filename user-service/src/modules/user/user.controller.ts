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
import { CreateUserDto } from './dto/createUser.dto';
import { FindAllUserDto } from './dto/findAllUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Query() query: FindAllUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
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
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}

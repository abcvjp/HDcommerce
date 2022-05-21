import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { ChangePasswordDto } from './dto/changePassword.dto';
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

  @Put('me')
  updateInfo(@UserId() userId, @Body() dto: UpdateUserInfoDto) {
    return this.userService.updateInfo(userId, dto);
  }

  @Put('/me/password')
  changePassword(@UserId() id: string, @Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(id, dto);
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

  @Patch(':id/enable')
  @Roles(UserRole.ADMIN)
  enable(@Param('id') id: string) {
    return this.userService.enable(id);
  }

  @Patch(':id/disable')
  @Roles(UserRole.ADMIN)
  disable(@Param('id') id: string) {
    return this.userService.disable(id);
  }
}

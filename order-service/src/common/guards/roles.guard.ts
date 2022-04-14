import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/clients/user/user.service';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../constants';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;
    const { userId } = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(userId);
    return requiredRoles.includes(user.role);
  }
}

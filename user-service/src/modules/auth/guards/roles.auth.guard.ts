import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/schemas/user.schema';
import { UserService } from 'src/modules/user/user.service';

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

    const request = context.switchToHttp().getRequest();
    let user;
    if (request.user) {
      user = request.user;
    } else if (request.userId) {
      user = await this.userService.findOne(request.userId);
    } else throw new UnauthorizedException();

    return requiredRoles.includes(user.role);
  }
}

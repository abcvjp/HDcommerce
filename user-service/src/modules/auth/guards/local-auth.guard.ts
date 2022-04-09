import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isString } from 'class-validator';
import { validateEmail } from 'src/utils/funcs.util';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // VALIDATION FOR LOGIN BODY
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    if (err || !user) {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      if (!password) {
        throw new BadRequestException('Password is required');
      }
      if (!isString(email)) {
        throw new BadRequestException('Email must be a string');
      }
      if (!isString(password)) {
        throw new BadRequestException('Password must be a string');
      }
      if (!validateEmail(email)) {
        throw new BadRequestException('Email must be a correct email');
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

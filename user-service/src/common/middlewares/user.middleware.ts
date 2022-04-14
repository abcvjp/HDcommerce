import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    if (request['userId']) {
      request['user'] = await this.userService.findOne(request['userId']);
    }
    next();
  }
}

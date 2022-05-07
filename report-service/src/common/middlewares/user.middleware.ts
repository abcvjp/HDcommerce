import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from 'src/clients/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { headers } = request;
    request['userId'] = headers['x-consumer-username'];
    request['jwtId'] = headers['x-credential-identifier'];
    if (request['userId']) {
      request['user'] = await this.userService.findOne(request['userId']);
    }
    next();
  }
}

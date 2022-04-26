import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    const { headers } = request;
    request['userId'] = headers['x-consumer-username'];
    request['jwtId'] = headers['x-credential-identifier'];
    next();
  }
}

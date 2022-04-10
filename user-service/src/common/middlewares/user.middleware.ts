import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    const { headers } = request;
    console.log(headers);
    request['userId'] = headers['x-consumer-username'];
    request['jwtId'] = headers['x-credential-identifier'];
    next();
  }
}

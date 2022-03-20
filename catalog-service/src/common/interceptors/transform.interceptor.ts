import {
  CallHandler,
  ExecutionContext,
  HttpCode,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OkResponse } from '../responses';

@Injectable()
export class ResponseSerializator<T>
  implements NestInterceptor<T, OkResponse<T> | T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<OkResponse<T> | T> | Promise<Observable<OkResponse<T> | T>> {
    return next.handle().pipe(
      map((data) => {
        const hostType = context.getType();
        if (hostType === 'http') {
          const { statusCode } = context.switchToHttp().getResponse();
          return new OkResponse(data, statusCode);
        } else {
          return data;
        }
      }),
    );
  }
}

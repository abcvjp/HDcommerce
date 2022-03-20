import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        const hostType = context.getType();
        if (hostType === 'http') {
          if (exception instanceof HttpException) {
            return throwError(() => exception);
          } else {
            throw new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        } else if (hostType === 'rpc') {
          if (exception instanceof HttpException) {
            throw new RpcException(exception.message);
          } else if (exception instanceof RpcException) {
            throw exception;
          } else {
            throw new RpcException('Internal server error');
          }
        }
      }),
    );
  }
}

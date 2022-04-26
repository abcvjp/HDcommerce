import { HttpStatus } from '@nestjs/common';

export class OkResponse<T> {
  meta: {
    code: HttpStatus;
    message?: string;
  };
  data?: T;

  constructor(data?: T, code?: HttpStatus, message?: string) {
    this.meta = { code: HttpStatus.OK };
    this.data = data;
    this.meta.code = code;
    this.meta.message = message;
  }
}

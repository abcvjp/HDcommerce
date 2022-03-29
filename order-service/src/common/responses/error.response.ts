import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  code: HttpStatus;
  message: string | string[];
  path: string;
  timestamp: string;

  constructor(
    message: string | string[],
    path: string,
    code?: HttpStatus,
    timestamp?: string,
  ) {
    this.code = code ? code : HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.path = path;
    this.timestamp = timestamp ? timestamp : new Date().toISOString();
  }
}

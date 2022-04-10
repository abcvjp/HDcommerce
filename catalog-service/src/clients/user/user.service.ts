import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { httpCallHandler } from '../client.http-handler';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  findOne(id: string): Promise<any> {
    return httpCallHandler(this.httpService.get(`${id}`));
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { httpCallHandler } from '../client.http-handler';

@Injectable()
export class GatewayService {
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {}

  createConsumer(
    custom_id: string,
    username?: string,
    tags?: string[],
  ): Promise<any> {
    return httpCallHandler(
      this.httpService.post('/consumers', { custom_id, username, tags }),
    );
  }

  createConsumerJWT(consumerUserName: string): Promise<any> {
    return httpCallHandler(
      this.httpService.post(`/consumers/${consumerUserName}/jwt`, {
        secret: this.configService.get('jwt.secret'),
      }),
    );
  }

  getConsumerJWT(consumerUserName: string): Promise<any> {
    return httpCallHandler(
      this.httpService.get(`/consumers/${consumerUserName}/jwt`),
    );
  }
}

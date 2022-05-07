import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { httpCallHandler } from '../client.http-handler';

@Injectable()
export class CatalogService {
  constructor(private httpService: HttpService) {}

  getOneProduct(id: string): Promise<any> {
    return httpCallHandler(this.httpService.get(`/product/${id}`));
  }

  checkItemsValid(items: object[]): Promise<any> {
    return httpCallHandler(
      this.httpService.get('/cart/check-valid', {
        data: { items },
      }),
    );
  }
}

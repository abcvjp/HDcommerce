import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { generateMailContent } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  async handleUserCreated(message: any) {
    await this.appService.sendMail(
      'test@example.com',
      'Your account have been created successfully',
      'alsdfkjaskdfj',
    );
  }

  @EventPattern('orderCreation-OK')
  async handleOrderCreated(message: any) {
    console.log(message.value);
    // await this.appService.sendMail(
    // 'test@example.com',
    // 'order created',
    // await generateMailContent(message.value, 'order-confirmation'),
    // );
  }
}

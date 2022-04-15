import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(to: string, subject: string, content: string): Promise<void> {
    await this.mailerService.sendMail({
      to, // list of receivers
      from: 'hoaideptrai@example.com', // sender address
      subject, // Subject line
      // text: 'welcome', // plaintext body
      html: content, // HTML body content
    });
  }
}

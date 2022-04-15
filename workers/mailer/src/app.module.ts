import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: process.env.MAIL_TRANSPORT_URI,
      defaults: {
        from: '"hoai-dep-trai" <from@example.com>',
      },
      preview: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

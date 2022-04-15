import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const {
    BROKER_URI,
    BROKER_API_KEY,
    BROKER_API_SECRET,
    BROKER_CLIENT_ID,
    BROKER_CONSUMER_GROUP_ID,
  } = process.env;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: BROKER_CLIENT_ID,
          brokers: [BROKER_URI],
          ssl: true,
          sasl: {
            mechanism: 'plain', // scram-sha-256 or scram-sha-512
            username: BROKER_API_KEY,
            password: BROKER_API_SECRET,
          },
        },
        consumer: {
          groupId: BROKER_CONSUMER_GROUP_ID,
          allowAutoTopicCreation: true,
        },
        // producer: {
        // allowAutoTopicCreation: true,
        // idempotent: true,
        // },
      },
    },
  );
  await app.listen();
}
bootstrap();

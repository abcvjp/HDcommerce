import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const { port } = config.get('app');

  // Microservice Transports
  // Kafka Transport
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: config.get('broker'),
  });

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      enableDebugMessages:
        config.get('app.environment') === 'development' ? true : false,
    }),
  );

  const environment = config.get('app.environment');
  await app.startAllMicroservices();
  await app.listen(port, () => {
    Logger.log(`Server is listening at http://localhost:${port}`);
    Logger.log(`Evironment: ${environment}`);
  });
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RabbitMQ microservice disabled for now to allow local development
  // Uncomment the block below to enable RMQ integration.
  /*
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL ?? 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE ?? 'procurement-outbox',
      queueOptions: { durable: true },
    },
  });
  */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();

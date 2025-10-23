import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { STATUSES_QUEUE_NAME } from '@app/contracts/statuses/statuses.constants';
import { StatusesAppModule } from './statuses-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StatusesAppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${envs.RMQ_USER}:${envs.RMQ_PASSWORD}@${envs.RABBITMQ_URL}`],
      queue: STATUSES_QUEUE_NAME,
      queueOptions: {
        durable: true,
      }
    },
  });
  await app.listen();
}
bootstrap();

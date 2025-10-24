import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { STATUS_HISTORIES_QUEUE_NAME } from '@app/contracts/status-history/status-histories.constants';
import { StatusHistoriesAppModule } from './status-histories-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StatusHistoriesAppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${envs.RMQ_USER}:${envs.RMQ_PASSWORD}@${envs.RABBITMQ_URL}`],
      queue: STATUS_HISTORIES_QUEUE_NAME,
      queueOptions: {
        durable: true,
      }
    },
  });
  await app.listen();
}
bootstrap();

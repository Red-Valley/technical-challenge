import { NestFactory } from '@nestjs/core';
import { ProvidersModule } from './providers.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { PROVIDERS_QUEUE_NAME } from '@app/contracts/providers/providers.constants';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProvidersModule, {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${envs.RMQ_USER}:${envs.RMQ_PASSWORD}@${envs.RABBITMQ_URL}`],
        queue: PROVIDERS_QUEUE_NAME,
        queueOptions: {
          durable: true,
        }
      },
    });
  await app.listen();
}
bootstrap();

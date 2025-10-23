import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { PROVIDERS_QUEUE_NAME } from '@app/contracts/providers/providers.constants';
import { ProvidersAppModule } from './providers-app.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProvidersAppModule, {
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

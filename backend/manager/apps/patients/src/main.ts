import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';
import { PatientsAppModule } from './patients-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PatientsAppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${envs.RMQ_USER}:${envs.RMQ_PASSWORD}@${envs.RABBITMQ_URL}`],
      queue: 'patients_queue',
      queueOptions: {
        durable: true,
      }
    },
  });
  await app.listen();
}
bootstrap();

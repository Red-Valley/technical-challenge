import { NestFactory } from '@nestjs/core';
import { PatientsModule } from './patients.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PatientsModule, {
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

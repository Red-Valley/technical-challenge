import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';

@Module({})
export class SharedClientModule {
  static register(serviceName: symbol, queue: string): DynamicModule {
    return {
      module: SharedClientModule,
      imports: [
        ClientsModule.register([
          {
            name: serviceName,
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${envs.RMQ_USER}:${envs.RMQ_PASSWORD}@${envs.RABBITMQ_URL}`],
              queue,
              queueOptions: { durable: true },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
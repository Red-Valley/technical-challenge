import { NestFactory } from '@nestjs/core';
import { ManagerApiGatewayModule } from './manager-api-gateway.module';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(ManagerApiGatewayModule);

  await app.listen(envs.PORT);
}
bootstrap();

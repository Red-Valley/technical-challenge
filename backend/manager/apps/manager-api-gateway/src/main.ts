import { NestFactory } from '@nestjs/core';
import { ManagerApiGatewayModule } from './manager-api-gateway.module';
import { envs } from './config/envs';
import { LoggerService } from '@nestjs/common';
import { LOGGER_SERVICE_SYMBOL } from '@app/logger/constants/logger-symbol.constants';

async function bootstrap() {
  const app = await NestFactory.create(ManagerApiGatewayModule);

  const logger = app.get<LoggerService>(LOGGER_SERVICE_SYMBOL);
  app.useLogger(logger);

  await app.listen(envs.PORT);
}
bootstrap();

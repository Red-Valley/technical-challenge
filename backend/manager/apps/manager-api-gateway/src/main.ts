import { NestFactory } from '@nestjs/core';
import { ManagerApiGatewayModule } from './manager-api-gateway.module';
import { envs } from './config/envs';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { LOGGER_SERVICE_SYMBOL } from '@app/logger/constants/logger-symbol.constants';

async function bootstrap() {
  const app = await NestFactory.create(ManagerApiGatewayModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const logger = app.get<LoggerService>(LOGGER_SERVICE_SYMBOL);
  app.useLogger(logger);

  await app.listen(envs.PORT);
}
bootstrap();

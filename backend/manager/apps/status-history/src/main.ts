import { NestFactory } from '@nestjs/core';
import { StatusHistoryModule } from './status-history.module';

async function bootstrap() {
  const app = await NestFactory.create(StatusHistoryModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

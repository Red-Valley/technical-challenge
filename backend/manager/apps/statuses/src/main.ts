import { NestFactory } from '@nestjs/core';
import { StatusesModule } from './statuses.module';

async function bootstrap() {
  const app = await NestFactory.create(StatusesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { StatusesService } from '../../modules/statuses/statuses.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const statusesService = app.get(StatusesService);

  try {
    await statusesService.seedStatuses();
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

seed();

import { DataSource } from 'typeorm';
import { seedStatuses } from './seeds/status.seed';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME || 'admin',
  password: process.env.DATABASE_PASSWORD || 'password123',
  database: process.env.DATABASE_NAME || 'medwork',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
});

async function runSeed() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    await seedStatuses(dataSource);

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seed:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeed();

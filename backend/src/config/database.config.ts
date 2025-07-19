import { DataSource } from 'typeorm';
import { Patient, Provider, Status, StatusHistory } from '../entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'medwork_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Patient, Provider, Status, StatusHistory],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});

export default AppDataSource; 
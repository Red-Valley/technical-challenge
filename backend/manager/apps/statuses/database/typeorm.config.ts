import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
import { Status } from '@app/contracts/statuses/entities/status.entity';

export default new DataSource({
  type: 'postgres',
  host: envs.DB_HOST || 'localhost',
  port: envs.DB_PORT || 5432,
  username: envs.DB_USERNAME || 'postgres',
  password: envs.DB_PASSWORD || 'postgres',
  database: envs.DB_DATABASE || 'manager',
  entities: [Status],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
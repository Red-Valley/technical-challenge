import { Module } from '@nestjs/common';
import { StatusesModule } from './statuses/statuses.module';
import { envs } from '../config/envs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '@app/contracts/statuses/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_DATABASE,
      entities: [Status],
      synchronize: true,
    }),
    StatusesModule
  ],
  controllers: [],
  providers: [],
})
export class StatusesAppModule {}

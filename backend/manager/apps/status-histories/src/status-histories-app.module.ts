import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config/envs';
import { StatusHistory } from '@app/contracts/status-history/entities/status-history.entity';
import { StatusHistoriesModule } from './status-histories/status-histories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_DATABASE,
      entities: [StatusHistory],
      synchronize: true,
    }),
    StatusHistoriesModule,
  ],
})
export class StatusHistoriesAppModule {}

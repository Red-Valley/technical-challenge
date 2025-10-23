import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config/envs';
import { ProvidersModule } from './providers/providers.module';
import { Provider } from '@app/contracts/providers/entities/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_DATABASE,
      entities: [Provider],
      synchronize: true,
    }),
    ProvidersModule
  ],
  controllers: [],
  providers: [],
})
export class ProvidersAppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Provider } from './entities/provider.entity';
import { Status } from './entities/status.entity';
import { StatusHistory } from './entities/status-history.entity';
import { PatientsModule } from './modules/patients/patients.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { StatusesModule } from './modules/statuses/statuses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Patient, Provider, Status, StatusHistory],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    PatientsModule,
    ProvidersModule,
    StatusesModule,
  ],
})
export class AppModule {}

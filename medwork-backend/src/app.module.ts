import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusesModule } from './statuses/statuses.module';
import { ProvidersModule } from './providers/providers.module';
import { PatientsModule } from './patients/patients.module';
import { StatusHistoryModule } from './status-history/status-history.module';
import { Status } from './statuses/status.entity';
import { Provider } from './providers/provider.entity';
import { Patient } from './patients/patient.entity';
import { StatusHistory } from './status-history/status-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Status, Provider, Patient, StatusHistory],
      synchronize: true, // Solo en desarrollo
      logging: true,
    }),
    StatusesModule,
    ProvidersModule,
    PatientsModule,
    StatusHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

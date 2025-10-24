import { Module } from '@nestjs/common';
import { envs } from './config/envs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '@app/contracts/patients/entities/patient.entity';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_DATABASE,
      entities: [Patient],
      synchronize: true,
    }),
    PatientsModule
  ],
})
export class PatientsAppModule {}

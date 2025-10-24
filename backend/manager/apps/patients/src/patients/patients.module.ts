import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientsDao } from './patients.dao';
import { Patient } from '@app/contracts/patients/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient])
  ],
  controllers: [PatientsController],
  providers: [PatientsService, PatientsDao],
})
export class PatientsModule {}

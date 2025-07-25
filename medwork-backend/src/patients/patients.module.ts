import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { StatusHistory } from '../status-history/status-history.entity';
import { Status } from '../statuses/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, StatusHistory, Status])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}

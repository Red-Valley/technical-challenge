import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../../entities/patient.entity';
import { Provider } from '../../entities/provider.entity';
import { Status } from '../../entities/status.entity';
import { StatusHistory } from '../../entities/status-history.entity';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Provider, Status, StatusHistory])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}

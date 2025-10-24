import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PatientsService } from './patients.service';
import { PATIENTS_PATTERNS } from '@app/contracts/patients/patterns/patients.patterns';
import { UpdatePatientWithIdDto } from '@app/contracts/patients/DTO/update-patient.dto';
import { CreatePatientDto } from '@app/contracts/patients/DTO/create-patient.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';

@Controller()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @MessagePattern(PATIENTS_PATTERNS.CREATE)
  create(createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @MessagePattern(PATIENTS_PATTERNS.FIND_ALL)
  findAll() {
    return this.patientsService.findAll();
  }
  @MessagePattern(PATIENTS_PATTERNS.FIND_ONE)
  findOne({id}: IdDto) {
    return this.patientsService.findOne(id);
  }

  @MessagePattern(PATIENTS_PATTERNS.UPDATE)
  update(updatePatientDto: UpdatePatientWithIdDto) {
    const { id, ...updateData } = updatePatientDto;
    return this.patientsService.update(id, updateData);
  }

  @MessagePattern(PATIENTS_PATTERNS.REMOVE)
  remove(id: string) {
    return this.patientsService.remove(id);
  }
}

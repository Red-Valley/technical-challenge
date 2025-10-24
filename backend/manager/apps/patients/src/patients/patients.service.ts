import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '@app/contracts/patients/DTO/create-patient.dto';
import { UpdatePatientDto } from '@app/contracts/patients/DTO/update-patient.dto';
import { PatientsDao } from './patients.dao';

@Injectable()
export class PatientsService {
  constructor(private patientsDao: PatientsDao) {}

  create(createPatientDto: CreatePatientDto) {
    return this.patientsDao.create(createPatientDto);
  }

  findAll() {
    return this.patientsDao.findAll();
  }

  findOne(id: string) {
    return this.patientsDao.findOne(id);
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.patientsDao.update(id, updatePatientDto);
  }

  async remove(id: string) {
    return this.patientsDao.remove(id);
  }
}

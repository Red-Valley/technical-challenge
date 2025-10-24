import { CreatePatientDto } from "@app/contracts/patients/DTO/create-patient.dto";
import { Patient } from "@app/contracts/patients/entities/patient.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PatientsDao {

  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>
  ) {}

  create(patient: CreatePatientDto) {
    const newPatient = this.patientsRepository.create(patient);
    return this.patientsRepository.save(newPatient);
  }

  findAll() {
    return this.patientsRepository.find();
  }

  findOne(id: string) {
    return this.patientsRepository.findOne({ where: { id } });
  }

  async update(id: string, patient: Partial<Patient>) {
    const updatedPatient = await this.patientsRepository.update(id, patient);
    return !!updatedPatient.affected;
  }

  async remove(id: string) {
    const deletedPatient = await this.patientsRepository.delete(id);
    return !!deletedPatient.affected;
  }
}
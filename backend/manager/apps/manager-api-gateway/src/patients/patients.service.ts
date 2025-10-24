import { Patient } from '@app/contracts/patients/entities/patient.entity';
import { PATIENTS_SERVICE_NAME } from '@app/contracts/patients/patients.constants';
import { PATIENTS_PATTERNS } from '@app/contracts/patients/patterns/patients.patterns';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class PatientsService {
  constructor(@Inject(PATIENTS_SERVICE_NAME) private readonly client: ClientProxy) {}

  findAll(): Observable<Patient[]> {
    return this.client.send<Patient[]>(PATIENTS_PATTERNS.FIND_ALL, {});
  }

  findOne(id: string): Observable<Patient> {
    return this.client.send<Patient>(PATIENTS_PATTERNS.FIND_ONE, { id });
  }

  create(createPatientDto: any): Observable<Patient> {
    return this.client.send<Patient>(PATIENTS_PATTERNS.CREATE, createPatientDto);
  }

  update(id: string, updatePatientDto: any): Observable<boolean> {
    return this.client.send<boolean>(PATIENTS_PATTERNS.UPDATE, { id, ...updatePatientDto });
  }

  remove(id: string): Observable<boolean> {
    return this.client.send<boolean>(PATIENTS_PATTERNS.REMOVE, { id });
  }
}

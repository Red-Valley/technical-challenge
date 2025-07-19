import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient, StatusHistory } from '../../entities';
import { CreatePatientDto, UpdatePatientDto, UpdatePatientStatusDto } from './dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(StatusHistory)
    private readonly statusHistoryRepository: Repository<StatusHistory>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    await this.patientRepository.save(patient);
    
    // Return the created patient with relations
    return await this.findOne(patient.id);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find({
      relations: ['provider', 'status'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['provider', 'status'],
    });

    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    console.log('Updating patient:', id, 'with data:', updatePatientDto);
    
    const patient = await this.findOne(id);
    console.log('Current patient status_id:', patient.status_id);
    
    // Update fields explicitly instead of using Object.assign
    if (updatePatientDto.full_name !== undefined) {
      patient.full_name = updatePatientDto.full_name;
    }
    if (updatePatientDto.email !== undefined) {
      patient.email = updatePatientDto.email;
    }
    if (updatePatientDto.phone !== undefined) {
      patient.phone = updatePatientDto.phone;
    }
    if (updatePatientDto.provider_id !== undefined) {
      patient.provider_id = updatePatientDto.provider_id;
      console.log('Setting provider_id to:', updatePatientDto.provider_id);
    }
    if (updatePatientDto.status_id !== undefined) {
      patient.status_id = updatePatientDto.status_id;
      console.log('Setting status_id to:', updatePatientDto.status_id);
    }
    
    console.log('Patient after explicit update - status_id:', patient.status_id);
    console.log('Patient after explicit update - provider_id:', patient.provider_id);
    
    // Use update method instead of save to ensure all fields are updated
    await this.patientRepository.update(id, {
      full_name: patient.full_name,
      email: patient.email,
      phone: patient.phone,
      provider_id: patient.provider_id,
      status_id: patient.status_id
    });
    console.log('Patient updated successfully');
    
    // Force reload the patient with fresh data using a direct query
    const updatedPatient = await this.patientRepository.findOne({
      where: { id },
      relations: ['provider', 'status'],
    });

    if (!updatedPatient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado después de la actualización`);
    }

    console.log('Updated patient status_id:', updatedPatient.status_id);
    console.log('Updated patient status:', updatedPatient.status);
    console.log('Updated patient provider_id:', updatedPatient.provider_id);
    console.log('Updated patient provider:', updatedPatient.provider);

    return updatedPatient;
  }

  async updateStatus(id: string, updateStatusDto: UpdatePatientStatusDto): Promise<Patient> {
    console.log('Updating patient status:', id, 'with status_id:', updateStatusDto.status_id);
    
    const patient = await this.findOne(id);
    console.log('Current patient status_id:', patient.status_id);
    
    // Crear registro en el historial
    const statusHistory = this.statusHistoryRepository.create({
      patient_id: id,
      status_id: updateStatusDto.status_id,
    });
    
    await this.statusHistoryRepository.save(statusHistory);
    console.log('Status history saved');
    
    // Actualizar el estado actual del paciente
    patient.status_id = updateStatusDto.status_id;
    await this.patientRepository.save(patient);
    console.log('Patient status updated in database');
    
    // Force reload the patient with fresh data using a direct query
    const updatedPatient = await this.patientRepository.findOne({
      where: { id },
      relations: ['provider', 'status'],
    });

    if (!updatedPatient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado después de la actualización de estado`);
    }

    console.log('Updated patient status_id:', updatedPatient.status_id);
    console.log('Updated patient status:', updatedPatient.status);

    return updatedPatient;
  }

  async getStatusHistory(id: string): Promise<StatusHistory[]> {
    const patient = await this.findOne(id);
    
    return await this.statusHistoryRepository.find({
      where: { patient_id: id },
      relations: ['status'],
      order: { changed_at: 'DESC' },
    });
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);
    
    // First, delete all status history records for this patient
    await this.statusHistoryRepository.delete({ patient_id: id });
    
    // Then delete the patient
    await this.patientRepository.remove(patient);
  }
} 
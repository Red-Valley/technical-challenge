import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
import { Provider } from '../../entities/provider.entity';
import { Status } from '../../entities/status.entity';
import { StatusHistory } from '../../entities/status-history.entity';
import { CreatePatientDto } from '../../dto/create-patient.dto';
import { ChangePatientStatusDto } from '../../dto/change-patient-status.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
    @InjectRepository(Provider)
    private readonly providersRepository: Repository<Provider>,
    @InjectRepository(Status)
    private readonly statusesRepository: Repository<Status>,
    @InjectRepository(StatusHistory)
    private readonly statusHistoryRepository: Repository<StatusHistory>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Verify provider exists
    const provider = await this.providersRepository.findOne({
      where: { id: createPatientDto.providerId },
    });
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    // Verify status exists
    const status = await this.statusesRepository.findOne({
      where: { id: createPatientDto.statusId },
    });
    if (!status) {
      throw new NotFoundException('Status not found');
    }

    // Create patient
    const patient = this.patientsRepository.create(createPatientDto);
    const savedPatient = await this.patientsRepository.save(patient);

    // Create initial status history entry
    const statusHistory = this.statusHistoryRepository.create({
      patientId: savedPatient.id,
      statusId: createPatientDto.statusId,
    });
    await this.statusHistoryRepository.save(statusHistory);

    return this.findOne(savedPatient.id);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find({
      relations: ['provider', 'status'],
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['provider', 'status'],
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async changeStatus(id: string, changeStatusDto: ChangePatientStatusDto): Promise<Patient> {
    const patient = await this.findOne(id);
    
    // Verify new status exists
    const newStatus = await this.statusesRepository.findOne({
      where: { id: changeStatusDto.statusId },
    });
    if (!newStatus) {
      throw new NotFoundException('Status not found');
    }

    // Check if status is actually changing
    if (patient.statusId === changeStatusDto.statusId) {
      throw new BadRequestException('Patient is already in this status');
    }

    // Update patient status
    await this.patientsRepository.update(id, { statusId: changeStatusDto.statusId });

    // Create status history entry
    const statusHistory = this.statusHistoryRepository.create({
      patientId: id,
      statusId: changeStatusDto.statusId,
    });
    await this.statusHistoryRepository.save(statusHistory);

    return this.findOne(id);
  }

  async getStatusHistory(id: string): Promise<StatusHistory[]> {
    const patient = await this.findOne(id);
    
    return this.statusHistoryRepository.find({
      where: { patientId: patient.id },
      relations: ['status'],
      order: { changedAt: 'DESC' },
    });
  }
}

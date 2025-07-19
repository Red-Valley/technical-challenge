import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { StatusHistory } from '../status-history/status-history.entity';
import { Status } from '../statuses/status.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(StatusHistory)
    private statusHistoryRepository: Repository<StatusHistory>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const scheduledStatus = await this.statusRepository.findOne({
      where: { name: 'Scheduled' },
    });

    if (!scheduledStatus) {
      throw new BadRequestException('Initial status "Scheduled" not found');
    }

    // Crear el paciente
    const patient = this.patientRepository.create({
      ...createPatientDto,
      statusId: scheduledStatus.id,
    });

    const savedPatient = await this.patientRepository.save(patient);

    await this.statusHistoryRepository.save({
      patientId: savedPatient.id,
      statusId: scheduledStatus.id,
      changedAt: new Date(),
    });

    return savedPatient;
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find({
      relations: ['provider', 'status'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['provider', 'status'],
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.findOne(id);

    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientRepository.remove(patient);
  }

  async changeStatus(
    id: string,
    changeStatusDto: ChangeStatusDto,
  ): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: ['status'],
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    const newStatus = await this.statusRepository.findOne({
      where: { id: changeStatusDto.statusId },
      relations: ['parent'],
    });

    if (!newStatus) {
      throw new BadRequestException(
        `Status with ID ${changeStatusDto.statusId} not found`,
      );
    }

    // Validar transición (simplificada para la prueba técnica)
    const isValidTransition = await this.isValidStatusTransition(
      patient.statusId,
      changeStatusDto.statusId,
    );

    if (!isValidTransition) {
      throw new BadRequestException('Invalid status transition');
    }

    // Actualizar el status del paciente
    await this.patientRepository.update(id, {
      statusId: changeStatusDto.statusId,
    });

    // Crear registro en el historial
    await this.statusHistoryRepository.save({
      patientId: id,
      statusId: changeStatusDto.statusId,
      changedAt: new Date(),
    });

    return await this.findOne(id);
  }

  async getPatientHistory(id: string): Promise<StatusHistory[]> {
    const patient = await this.findOne(id);

    return await this.statusHistoryRepository.find({
      where: { patientId: patient.id },
      relations: ['status'],
      order: { changedAt: 'DESC' },
    });
  }

  async findByProvider(providerId: string): Promise<Patient[]> {
    return await this.patientRepository.find({
      where: { providerId },
      relations: ['status'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(statusId: string): Promise<Patient[]> {
    return await this.patientRepository.find({
      where: { statusId },
      relations: ['provider', 'status'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByFullName(fullName: string): Promise<Patient | null> {
    return await this.patientRepository.findOne({
      where: { fullName },
      relations: ['provider', 'status'],
    });
  }

  private async isValidStatusTransition(
    currentStatusId: string,
    newStatusId: string,
  ): Promise<boolean> {
    // Validación simplificada: puede cambiar a cualquier hijo del status actual
    const newStatus = await this.statusRepository.findOne({
      where: { id: newStatusId },
      relations: ['parent'],
    });

    const currentStatus = await this.statusRepository.findOne({
      where: { id: currentStatusId },
      relations: ['children'],
    });

    if (!newStatus || !currentStatus) {
      return false;
    }

    // Puede cambiar a cualquier hijo directo
    const isChild = currentStatus.children.some(
      (child) => child.id === newStatusId,
    );

    // O puede retroceder al padre
    const isParent = newStatus.id === currentStatus.parentId;

    // O puede mantenerse en el mismo status (para casos especiales)
    const isSameStatus = currentStatusId === newStatusId;

    return isChild || isParent || isSameStatus;
  }
}

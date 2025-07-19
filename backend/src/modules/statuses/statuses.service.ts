import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status, Patient } from '../../entities';
import { CreateStatusDto, UpdateStatusDto } from './dto';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find({
      relations: ['parent', 'children'],
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Status> {
    const status = await this.statusRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!status) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    return status;
  }

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    // Validate parent_id if provided
    if (createStatusDto.parent_id) {
      const parent = await this.statusRepository.findOne({
        where: { id: createStatusDto.parent_id }
      });
      if (!parent) {
        throw new BadRequestException(`Parent status with ID ${createStatusDto.parent_id} not found`);
      }
    }

    const status = this.statusRepository.create(createStatusDto);
    const savedStatus = await this.statusRepository.save(status);
    return savedStatus;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);

    // Validate parent_id if provided and not self-referencing
    if (updateStatusDto.parent_id) {
      if (updateStatusDto.parent_id === id) {
        throw new BadRequestException('Status cannot be its own parent');
      }
      
      const parent = await this.statusRepository.findOne({
        where: { id: updateStatusDto.parent_id }
      });
      if (!parent) {
        throw new BadRequestException(`Parent status with ID ${updateStatusDto.parent_id} not found`);
      }
    }

    Object.assign(status, updateStatusDto);
    return await this.statusRepository.save(status);
  }

  async remove(id: string): Promise<void> {
    const status = await this.findOne(id);

    // Check if status has children
    const children = await this.statusRepository.find({
      where: { parent_id: id }
    });

    if (children.length > 0) {
      throw new BadRequestException(`Cannot delete status with children. Please delete or reassign ${children.length} child status(es) first.`);
    }

    // Check if status is being used by patients
    const patientsUsingStatus = await this.patientRepository.find({
      where: { status_id: id }
    });

    if (patientsUsingStatus.length > 0) {
      throw new BadRequestException(`Cannot delete status that is being used by ${patientsUsingStatus.length} patient(s). Please reassign patients to another status first.`);
    }

    // If no dependencies, proceed with deletion
    await this.statusRepository.remove(status);
  }

  async findRootStatuses(): Promise<Status[]> {
    return await this.statusRepository.find({
      where: { parent_id: null },
      relations: ['children'],
      order: { order: 'ASC' },
    });
  }

  async findChildren(parentId: string): Promise<Status[]> {
    return await this.statusRepository.find({
      where: { parent_id: parentId },
      order: { order: 'ASC' },
    });
  }
} 
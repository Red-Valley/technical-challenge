import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Status } from '../../entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private readonly statusesRepository: Repository<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    return this.statusesRepository.find({
      relations: ['parent', 'children'],
      order: { order: 'ASC' },
    });
  }

  async findHierarchy(): Promise<Status[]> {
    // Get root statuses (those without parent)
    const rootStatuses = await this.statusesRepository.find({
      where: { parentId: IsNull() },
      relations: ['children', 'children.children'],
      order: { order: 'ASC' },
    });

    return rootStatuses;
  }

  async seedStatuses(): Promise<void> {
    const existingStatuses = await this.statusesRepository.count();
    if (existingStatuses > 0) {
      return; // Already seeded
    }

    // Create root status
    const scheduled = this.statusesRepository.create({
      name: 'Scheduled',
      order: 1,
    });
    const savedScheduled = await this.statusesRepository.save(scheduled);

    // Create children of Scheduled
    const checkedIn = this.statusesRepository.create({
      name: 'Checked-In',
      parentId: savedScheduled.id,
      order: 2,
    });
    const savedCheckedIn = await this.statusesRepository.save(checkedIn);

    const noShow = this.statusesRepository.create({
      name: 'No-Show',
      parentId: savedScheduled.id,
      order: 5,
    });
    await this.statusesRepository.save(noShow);

    // Create children of Checked-In
    const inConsultation = this.statusesRepository.create({
      name: 'In Consultation',
      parentId: savedCheckedIn.id,
      order: 3,
    });
    await this.statusesRepository.save(inConsultation);

    const cancelled = this.statusesRepository.create({
      name: 'Cancelled',
      parentId: savedCheckedIn.id,
      order: 4,
    });
    await this.statusesRepository.save(cancelled);
  }
}

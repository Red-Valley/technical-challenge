import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find({
      relations: ['parent', 'children'],
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Status|null> {
    return await this.statusRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async getHierarchy(): Promise<Status[]> {
    return await this.statusRepository
      .createQueryBuilder('status')
      .leftJoinAndSelect('status.children', 'children')
      .where('status.parentId IS NULL')
      .orderBy('status.order', 'ASC')
      .addOrderBy('children.order', 'ASC')
      .getMany();
  }

  async getValidNextStatuses(currentStatusId: string): Promise<Status[]> {
    const currentStatus = await this.statusRepository.findOne({
      where: { id: currentStatusId },
      relations: ['children'],
    });

    if (!currentStatus) {
      return [];
    }

    // Retornar los hijos ordenados
    return currentStatus.children.sort((a, b) => a.order - b.order);
  }
}

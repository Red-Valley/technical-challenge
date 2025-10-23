import { CreateStatusDto } from '@app/contracts/statuses/DTO/create-status.dto';
import { UpdateStatusDto } from '@app/contracts/statuses/DTO/update-status.dto';
import { Injectable } from '@nestjs/common';
import { StatusesDao } from './statuses.dao';

@Injectable()
export class StatusesService {
  constructor(private statusesDao: StatusesDao) {}

  async create(createStatusDto: CreateStatusDto) {
    await this.validateUniqueOrder(
      createStatusDto.parent_id || null,
      createStatusDto.order || null,
    );

    return this.statusesDao.create(createStatusDto);
  }

  async findAll() {
    return this.statusesDao.findAll();
  }

  async findOne(id: string) {
    return this.statusesDao.findOne(id);
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {

    const currentStatus = await this.statusesDao.findOne(id);
    if (!currentStatus) {
      throw new Error('Status not found');
    }

    if(currentStatus.order !== updateStatusDto.order){
      await this.validateUniqueOrder(
        updateStatusDto.parent_id || null,
        updateStatusDto.order || null,
      );
    }

    const updated = await this.statusesDao.update(id, updateStatusDto);
    return {
      updated: !!updated.affected,
    };
  }

  async remove(id: string) {
    return this.statusesDao.remove(id);
  }

  private async validateUniqueOrder(
    parentId: string | null,
    order: number | null,
  ): Promise<void> {
    const isUnique = await this.statusesDao.isOrderUnique(parentId, order);
    if (!isUnique) {
      throw new Error('Order must be unique within the same parent status');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { StatusHistoriesDao } from './status-histories.dao';
import { CreateStatusHistoryDto } from '@app/contracts/status-history/DTO/create-status-history.dto';
import { UpdateStatusHistoryDto } from '@app/contracts/status-history/DTO/update-status-history.dto';

@Injectable()
export class StatusHistoriesService {
  constructor(
    private statusHistoriesDao: StatusHistoriesDao
  ) {}

  create(createStatusHistoryDto: CreateStatusHistoryDto) {
    return this.statusHistoriesDao.create(createStatusHistoryDto);
  }

  findAll() {
    return this.statusHistoriesDao.findAll();
  }

  findOne(id: string) {
    return this.statusHistoriesDao.findOne(id);
  }

  async update(id: string, updateStatusHistoryDto: UpdateStatusHistoryDto) {
    return this.statusHistoriesDao.update(id, updateStatusHistoryDto);
  }

  async remove(id: string) {
    return this.statusHistoriesDao.remove(id);
  }

}

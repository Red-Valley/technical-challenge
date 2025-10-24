import { CreateStatusHistoryDto } from "@app/contracts/status-history/DTO/create-status-history.dto";
import { UpdateStatusHistoryDto } from "@app/contracts/status-history/DTO/update-status-history.dto";
import { StatusHistory } from "@app/contracts/status-history/entities/status-history.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StatusHistoriesDao {
  constructor(
    @InjectRepository(StatusHistory)
    private statusHistoriesRepository: Repository<StatusHistory>
  ) {}

  create(statusHistory: CreateStatusHistoryDto) {
    const newStatusHistory = this.statusHistoriesRepository.create(statusHistory);
    return this.statusHistoriesRepository.save(newStatusHistory);
  }
  findAll() {
    return this.statusHistoriesRepository.find();
  }
  findOne(id: string) {
    return this.statusHistoriesRepository.findOne({ where: { id } });
  }

  async update(id: string, statusHistory: UpdateStatusHistoryDto) {
    const updatedStatusHistory = await this.statusHistoriesRepository.update(id, statusHistory);
    return !!updatedStatusHistory.affected;
  }

  async remove(id: string) {
    const deletedStatusHistory = await this.statusHistoriesRepository.delete(id);
    return !!deletedStatusHistory.affected;
  }

}
import { CreateStatusDto } from "@app/contracts/statuses/DTO/create-status.dto";
import { UpdateStatusDto } from "@app/contracts/statuses/DTO/update-status.dto";
import { Status } from "@app/contracts/statuses/entities/status.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StatusesDao {
  constructor(
    @InjectRepository(Status)
    private statusesRepository: Repository<Status>,
  ) {}

  create(createStatusDto: CreateStatusDto) {
    const status = this.statusesRepository.create(createStatusDto);
    return this.statusesRepository.save(status);
  }

  findAll() {
    return this.statusesRepository.find();
  }
  findOne(id: string) {
    return this.statusesRepository.findOne({ where: { id } });
  }
  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusesRepository.update(id, updateStatusDto);
  }
  remove(id: string) {
    return this.statusesRepository.delete(id);
  }

  async isOrderUnique(parentId: string | null, order: number | null): Promise<boolean> {

    if(!parentId || order === null) return true;

    const existingStatus = await this.statusesRepository.findOne({
      where: { parent_id: parentId, order },
    });
    return !existingStatus;
  }
}

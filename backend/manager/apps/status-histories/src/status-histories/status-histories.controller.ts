import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatusHistoriesService } from './status-histories.service';
import { IdDto } from '@app/contracts/global-dto/id.dto';
import { CreateStatusHistoryDto } from '@app/contracts/status-history/DTO/create-status-history.dto';
import { UpdateStatusHistoryWithIdDto } from '@app/contracts/status-history/DTO/update-status-history.dto';
import { STATUS_HISTORIES_PATTERNS } from '@app/contracts/status-history/patterns/status-histories.patterns';

@Controller()
export class StatusHistoriesController {
  constructor(private readonly statusHistoriesService: StatusHistoriesService) {}

  @MessagePattern(STATUS_HISTORIES_PATTERNS.CREATE)
  create(@Payload() createStatusHistoryDto: CreateStatusHistoryDto) {
    return this.statusHistoriesService.create(createStatusHistoryDto);
  }

  @MessagePattern(STATUS_HISTORIES_PATTERNS.FIND_ALL)
  findAll() {
    return this.statusHistoriesService.findAll();
  }

  @MessagePattern(STATUS_HISTORIES_PATTERNS.FIND_ONE)
  findOne(@Payload() {id}: IdDto) {
    return this.statusHistoriesService.findOne(id);
  }

  @MessagePattern(STATUS_HISTORIES_PATTERNS.UPDATE)
  update(@Payload() updateStatusHistoryDto: UpdateStatusHistoryWithIdDto) {
    const { id, ...updateData } = updateStatusHistoryDto;
    return this.statusHistoriesService.update(id, updateData);
  }

  @MessagePattern(STATUS_HISTORIES_PATTERNS.REMOVE)
  remove(@Payload() {id}: IdDto) {
    return this.statusHistoriesService.remove(id);
  }
}

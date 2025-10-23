import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from '@app/contracts/statuses/DTO/create-status.dto';
import { UpdateStatusWithIdDto } from '@app/contracts/statuses/DTO/update-status.dto';
import { STATUSES_PATTERNS } from '@app/contracts/statuses/patterns/statuses.patterns';
import { IdDto } from '@app/contracts/global-dto/id.dto';

@Controller()
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @MessagePattern(STATUSES_PATTERNS.CREATE)
  create(@Payload() createStatusDto: CreateStatusDto) {
    return this.statusesService.create(createStatusDto);
  }

  @MessagePattern(STATUSES_PATTERNS.FIND_ALL)
  findAll() {
    return this.statusesService.findAll();
  }

  @MessagePattern(STATUSES_PATTERNS.FIND_ONE)
  findOne(@Payload() { id }: IdDto) {
    return this.statusesService.findOne(id);
  }

  @MessagePattern(STATUSES_PATTERNS.UPDATE)
  update(@Payload() updateStatusDto: UpdateStatusWithIdDto) {
    const { id, ...updateData } = updateStatusDto;
    return this.statusesService.update(id, updateData);
  }

  @MessagePattern(STATUSES_PATTERNS.REMOVE)
  remove(@Payload() id: string) {
    return this.statusesService.remove(id);
  }
}

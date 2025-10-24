import { IdDto } from '@app/contracts/global-dto/id.dto';
import { CreateStatusHistoryDto } from '@app/contracts/status-history/DTO/create-status-history.dto';
import { UpdateStatusHistoryDto } from '@app/contracts/status-history/DTO/update-status-history.dto';
import { StatusHistory } from '@app/contracts/status-history/entities/status-history.entity';
import { STATUS_HISTORIES_PATTERNS } from '@app/contracts/status-history/patterns/status-histories.patterns';
import { STATUS_HISTORIES_SERVICE_NAME } from '@app/contracts/status-history/status-histories.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StatusHistoriesService {
  constructor(
    @Inject(STATUS_HISTORIES_SERVICE_NAME) private readonly client: ClientProxy
  ) {}

  findAll() {
    return this.client.send<StatusHistory[]>(STATUS_HISTORIES_PATTERNS.FIND_ALL, {});
  }

  findOne(id: string) {
    return this.client.send<StatusHistory>(STATUS_HISTORIES_PATTERNS.FIND_ONE, { id });
  }

  create(createStatusHistoryDto: CreateStatusHistoryDto) {
    return this.client.send<StatusHistory>(STATUS_HISTORIES_PATTERNS.CREATE, createStatusHistoryDto);
  }

  update(id: IdDto, updateStatusHistoryDto: UpdateStatusHistoryDto) {
    return this.client.send<StatusHistory>(STATUS_HISTORIES_PATTERNS.UPDATE, {
      ...id,
      ...updateStatusHistoryDto,
    });
  }

  remove(id: string) {
    return this.client.send<boolean>(STATUS_HISTORIES_PATTERNS.REMOVE, { id });
  } 
}

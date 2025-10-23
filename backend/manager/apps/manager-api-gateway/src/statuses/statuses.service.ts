import { CreateStatusDto } from '@app/contracts/statuses/DTO/create-status.dto';
import { UpdateStatusDto } from '@app/contracts/statuses/DTO/update-status.dto';
import { Status } from '@app/contracts/statuses/entities/status.entity';
import { STATUSES_PATTERNS } from '@app/contracts/statuses/patterns/statuses.patterns';
import { STATUSES_SERVICE_NAME } from '@app/contracts/statuses/statuses.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class StatusesService {

  constructor(@Inject(STATUSES_SERVICE_NAME) private readonly client: ClientProxy) {}

  findAll() {
    return this.client.send<Status[]>(STATUSES_PATTERNS.FIND_ALL, {});
  }

  findOne(id: string) {
    return this.client.send<Status>(STATUSES_PATTERNS.FIND_ONE, { id });
  }

  create(createStatusDto: CreateStatusDto): Observable<Status> {
    return this.client.send<Status>(STATUSES_PATTERNS.CREATE, createStatusDto);
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.client.send<Status>(STATUSES_PATTERNS.UPDATE, { id, ...updateStatusDto });
  }

  remove(id: string) {
    return this.client.send<boolean>(STATUSES_PATTERNS.REMOVE, { id });
  }
}

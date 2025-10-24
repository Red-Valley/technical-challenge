import { Module } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { SharedClientModule } from '../shared-client/shared-client.module';
import { STATUSES_QUEUE_NAME, STATUSES_SERVICE_NAME } from '@app/contracts/statuses/statuses.constants';

@Module({
  imports: [
    SharedClientModule.register(STATUSES_SERVICE_NAME, STATUSES_QUEUE_NAME),
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}

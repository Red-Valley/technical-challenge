import { Module } from '@nestjs/common';
import { StatusHistoriesController } from './status-histories.controller';
import { StatusHistoriesService } from './status-histories.service';
import { STATUS_HISTORIES_QUEUE_NAME, STATUS_HISTORIES_SERVICE_NAME } from '@app/contracts/status-history/status-histories.constants';
import { SharedClientModule } from '../shared-client/shared-client.module';

@Module({
  imports: [
    SharedClientModule.register(STATUS_HISTORIES_SERVICE_NAME, STATUS_HISTORIES_QUEUE_NAME),
  ],
  controllers: [StatusHistoriesController],
  providers: [StatusHistoriesService]
})
export class StatusHistoriesModule {}

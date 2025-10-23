import { Module } from '@nestjs/common';
import { StatusHistoryController } from './status-history.controller';
import { StatusHistoryService } from './status-history.service';

@Module({
  imports: [],
  controllers: [StatusHistoryController],
  providers: [StatusHistoryService],
})
export class StatusHistoryModule {}

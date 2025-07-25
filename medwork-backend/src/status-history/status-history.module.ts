import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusHistoryController } from './status-history.controller';
import { StatusHistoryService } from './status-history.service';
import { StatusHistory } from './status-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusHistory])],
  controllers: [StatusHistoryController],
  providers: [StatusHistoryService],
  exports: [StatusHistoryService],
})
export class StatusHistoryModule {}

import { Module } from '@nestjs/common';
import { StatusHistoriesService } from './status-histories.service';
import { StatusHistoriesController } from './status-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusHistory } from '@app/contracts/status-history/entities/status-history.entity';
import { StatusHistoriesDao } from './status-histories.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusHistory]),
  ],
  controllers: [StatusHistoriesController],
  providers: [StatusHistoriesService, StatusHistoriesDao],
})
export class StatusHistoriesModule {}

import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { Status } from '@app/contracts/statuses/entities/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusesDao } from './statuses.dao';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status])
  ],
  controllers: [StatusesController],
  providers: [StatusesService, StatusesDao],
})
export class StatusesModule {}

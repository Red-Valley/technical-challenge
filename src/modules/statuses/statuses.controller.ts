import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusesService } from './statuses.service';
import { Status } from '../../entities/status.entity';

@ApiTags('statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({ status: 200, description: 'List of all statuses' })
  findAll(): Promise<Status[]> {
    return this.statusesService.findAll();
  }

  @Get('hierarchy')
  @ApiOperation({ summary: 'Get statuses hierarchy' })
  @ApiResponse({ status: 200, description: 'Statuses in hierarchical structure' })
  findHierarchy(): Promise<Status[]> {
    return this.statusesService.findHierarchy();
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed initial statuses' })
  @ApiResponse({ status: 201, description: 'Statuses seeded successfully' })
  async seedStatuses(): Promise<{ message: string }> {
    await this.statusesService.seedStatuses();
    return { message: 'Statuses seeded successfully' };
  }
}

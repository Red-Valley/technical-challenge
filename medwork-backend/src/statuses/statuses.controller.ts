import { Controller, Get, Param } from '@nestjs/common';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  async findAll() {
    return await this.statusesService.findAll();
  }

  @Get('hierarchy')
  async getHierarchy() {
    return await this.statusesService.getHierarchy();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.statusesService.findOne(id);
  }

  @Get(':id/next')
  async getValidNextStatuses(@Param('id') id: string) {
    return await this.statusesService.getValidNextStatuses(id);
  }
}

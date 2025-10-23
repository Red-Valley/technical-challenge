import { Controller, Get } from '@nestjs/common';
import { StatusesService } from './statuses.service';

@Controller()
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  getHello(): string {
    return this.statusesService.getHello();
  }
}

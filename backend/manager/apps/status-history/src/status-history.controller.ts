import { Controller, Get } from '@nestjs/common';
import { StatusHistoryService } from './status-history.service';

@Controller()
export class StatusHistoryController {
  constructor(private readonly statusHistoryService: StatusHistoryService) {}

  @Get()
  getHello(): string {
    return this.statusHistoryService.getHello();
  }
}

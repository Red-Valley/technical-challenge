import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('status-history')
@Controller('status-history')
export class StatusHistoryController {}

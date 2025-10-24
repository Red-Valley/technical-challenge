import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateStatusHistoryDto } from './create-status-history.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';

export class UpdateStatusHistoryDto extends PartialType(CreateStatusHistoryDto) {}

export class UpdateStatusHistoryWithIdDto extends IntersectionType(
  IdDto,
  UpdateStatusHistoryDto,
) {}
import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateStatusDto } from './create-status.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {}

export class UpdateStatusWithIdDto extends IntersectionType(
  IdDto,
  UpdateStatusDto,
) {}
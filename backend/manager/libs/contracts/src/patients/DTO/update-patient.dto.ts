import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}

export class UpdatePatientWithIdDto extends IntersectionType(
  IdDto,
  UpdatePatientDto,
) {}
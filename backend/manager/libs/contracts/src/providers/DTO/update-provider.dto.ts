import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateProviderDto } from './create-provider.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}

export class UpdateProviderWithIdDto extends IntersectionType(
  IdDto,
  UpdateProviderDto,
) {}
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePatientStatusDto {
  @ApiProperty({ description: 'New status ID' })
  @IsUUID()
  statusId: string;
}

import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientStatusDto {
  @ApiProperty({ description: 'ID del nuevo estado' })
  @IsUUID()
  status_id: string;
} 
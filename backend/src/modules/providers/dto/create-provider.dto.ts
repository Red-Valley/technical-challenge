import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ description: 'Nombre completo del proveedor' })
  @IsString()
  full_name: string;

  @ApiProperty({ description: 'Especialidad del proveedor' })
  @IsString()
  specialty: string;
} 
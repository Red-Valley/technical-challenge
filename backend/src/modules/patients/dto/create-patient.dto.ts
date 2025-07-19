import { IsString, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePatientDto {
  @ApiProperty({ description: 'Nombre completo del paciente' })
  @IsString()
  full_name: string;

  @ApiProperty({ description: 'Email del paciente' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono del paciente' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'ID del proveedor asignado', required: false })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsUUID(undefined, { message: 'provider_id must be a valid UUID' })
  provider_id?: string;

  @ApiProperty({ description: 'ID del estado inicial', required: false })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsUUID(undefined, { message: 'status_id must be a valid UUID' })
  status_id?: string;
} 
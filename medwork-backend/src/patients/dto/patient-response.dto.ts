import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({
    description: 'ID único del paciente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Nombre completo del paciente',
    example: 'Juan Pérez García'
  })
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico del paciente',
    example: 'juan.perez@email.com'
  })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del paciente',
    example: '+1234567890'
  })
  phone: string;

  @ApiProperty({
    description: 'ID del proveedor médico asignado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  providerId: string;

  @ApiProperty({
    description: 'ID del estado clínico actual',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  statusId: string;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-01-15T10:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Información del proveedor médico',
    type: 'object',
    properties: {
      id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      fullName: { type: 'string', example: 'Dr. María González' },
      specialty: { type: 'string', example: 'Cardiología' }
    }
  })
  provider?: any;

  @ApiProperty({
    description: 'Información del estado clínico actual',
    type: 'object',
    properties: {
      id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      name: { type: 'string', example: 'En tratamiento' },
      description: { type: 'string', example: 'Paciente en proceso de tratamiento' }
    }
  })
  status?: any;
} 
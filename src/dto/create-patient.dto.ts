import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ description: 'Patient full name' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Patient email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Patient phone number' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Provider ID' })
  @IsUUID()
  providerId: string;

  @ApiProperty({ description: 'Status ID' })
  @IsUUID()
  statusId: string;
}

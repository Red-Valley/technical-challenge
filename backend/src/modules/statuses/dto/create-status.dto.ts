import { IsString, IsOptional, IsNumber, IsUUID, Min, IsEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateStatusDto {
  @ApiProperty({ description: 'Name of the status' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Parent status ID' })
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsUUID(undefined, { message: 'Parent ID must be a valid UUID' })
  parent_id?: string;

  @ApiProperty({ description: 'Order of the status', minimum: 1 })
  @IsNumber()
  @Min(1)
  order: number;
} 
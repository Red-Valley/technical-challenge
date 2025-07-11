import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from '../../dto/create-patient.dto';
import { ChangePatientStatusDto } from '../../dto/change-patient-status.dto';
import { Patient } from '../../entities/patient.entity';
import { StatusHistory } from '../../entities/status-history.entity';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created successfully' })
  @ApiResponse({ status: 404, description: 'Provider or Status not found' })
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'List of all patients' })
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient found' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change patient status' })
  @ApiResponse({ status: 200, description: 'Patient status updated successfully' })
  @ApiResponse({ status: 404, description: 'Patient or Status not found' })
  @ApiResponse({ status: 400, description: 'Patient is already in this status' })
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeStatusDto: ChangePatientStatusDto,
  ): Promise<Patient> {
    return this.patientsService.changeStatus(id, changeStatusDto);
  }

  @Get(':id/status-history')
  @ApiOperation({ summary: 'Get patient status history' })
  @ApiResponse({ status: 200, description: 'Patient status history' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  getStatusHistory(@Param('id', ParseUUIDPipe) id: string): Promise<StatusHistory[]> {
    return this.patientsService.getStatusHistory(id);
  }
}

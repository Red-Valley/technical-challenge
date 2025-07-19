import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body(ValidationPipe) createPatientDto: CreatePatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll(
    @Query('providerId') providerId?: string,
    @Query('statusId') statusId?: string,
  ) {
    if (providerId) {
      return await this.patientsService.findByProvider(providerId);
    }
    if (statusId) {
      return await this.patientsService.findByStatus(statusId);
    }
    return await this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientsService.findOne(id);
  }

  @Get(':id/history')
  async getHistory(@Param('id') id: string) {
    return await this.patientsService.getPatientHistory(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePatientDto: UpdatePatientDto,
  ) {
    return await this.patientsService.update(id, updatePatientDto);
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) changeStatusDto: ChangeStatusDto,
  ) {
    return await this.patientsService.changeStatus(id, changeStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.patientsService.remove(id);
    return { message: 'Patient deleted successfully' };
  }
}

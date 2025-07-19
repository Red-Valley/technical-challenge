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
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { PatientResponseDto } from './dto/patient-response.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo paciente',
    description: 'Crea un nuevo paciente con la información proporcionada',
  })
  @ApiResponse({
    status: 201,
    description: 'Paciente creado exitosamente',
    type: PatientResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  async create(@Body(ValidationPipe) createPatientDto: CreatePatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los pacientes',
    description:
      'Retorna una lista de todos los pacientes. Puede filtrar por proveedor o estado.',
  })
  @ApiQuery({
    name: 'providerId',
    required: false,
    description: 'ID del proveedor para filtrar pacientes',
  })
  @ApiQuery({
    name: 'statusId',
    required: false,
    description: 'ID del estado para filtrar pacientes',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes obtenida exitosamente',
  })
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
  @ApiOperation({
    summary: 'Obtener un paciente específico',
    description: 'Retorna la información detallada de un paciente por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del paciente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado exitosamente',
    type: PatientResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
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

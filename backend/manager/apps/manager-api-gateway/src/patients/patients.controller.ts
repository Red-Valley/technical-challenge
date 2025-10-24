import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body,
  Inject,
  Logger
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from '@app/contracts/patients/DTO/create-patient.dto';
import { UpdatePatientDto } from '@app/contracts/patients/DTO/update-patient.dto';
import { lastValueFrom } from 'rxjs';
import { PATIENTS_SERVICE_NAME } from '@app/contracts/patients/patients.constants';
import { ClientProxy } from '@nestjs/microservices';
import { standardResponse } from '@app/standard-response';
import { IdDto } from '@app/contracts/global-dto/id.dto';

@Controller('patients')
export class PatientsController {

  private readonly logger = new Logger(PatientsController.name);

  constructor(
    private readonly patientsService: PatientsService,
    @Inject(PATIENTS_SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    try {
      const result = await lastValueFrom(this.patientsService.findAll());
      return standardResponse(
        'Pacientes obtenidos correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener los pacientes: ' + error.message);
      return standardResponse(
        'Falló la obtención de los pacientes',
        null
      );
    }
  }

  @Get(':id')
  async findOne(@Param() {id}: IdDto) {
    try {
      const result = await lastValueFrom(
        this.patientsService.findOne(id)
      );
      return standardResponse(
        'Paciente obtenido correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener el paciente: ' + error.message);
      return standardResponse(
        'Falló la obtención del paciente',
        null
      );
    }
  }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const result = await lastValueFrom(
        this.patientsService.create(createPatientDto)
      );
      return standardResponse(
        'Paciente creado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al crear el paciente: ' + error.message);
      return standardResponse(
        'Falló la creación del paciente',
        null
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      const result = await lastValueFrom(
        this.patientsService.update(id, updatePatientDto)
      );
      return standardResponse(
        'Paciente actualizado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al actualizar el paciente: ' + error.message);
      return standardResponse(
        'Falló la actualización del paciente',
        null
      );
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await lastValueFrom(
        this.patientsService.remove(id)
      );
      return standardResponse(
        'Paciente eliminado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al eliminar el paciente: ' + error.message);
      return standardResponse(
        'Falló la eliminación del paciente',
        null
      );
    }
  }
}
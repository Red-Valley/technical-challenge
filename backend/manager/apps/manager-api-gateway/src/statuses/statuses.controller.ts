import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from '@app/contracts/statuses/DTO/create-status.dto';
import { UpdateStatusDto } from '@app/contracts/statuses/DTO/update-status.dto';
import { lastValueFrom } from 'rxjs';
import { standardResponse } from '@app/standard-response';
import { IdDto } from '@app/contracts/global-dto/id.dto';

@Controller('statuses')
export class StatusesController {

  private readonly logger = new Logger(StatusesController.name);

  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto) {
    try {
      const result = await lastValueFrom(
        this.statusesService.create(createStatusDto)
      );

      return standardResponse(
        'Se creó el estado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al crear el estado: ' + error.message);
      return standardResponse(
        'Falló la creación del estado',
        null,
        false
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await lastValueFrom(
        this.statusesService.findAll()
      );
      return standardResponse(
        'Estados obtenidos correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener los estados: ' + error.message);
      return standardResponse(
        'Falló la obtención de los estados',
        null
      );
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: IdDto) {
    try {
      const result = await lastValueFrom(
        this.statusesService.findOne(id)
      );
      return standardResponse(
        'Estado obtenido correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener el estado: ' + error.message);
      return standardResponse(
        'Falló la obtención del estado',
        null
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      const result = await lastValueFrom(
        this.statusesService.update(id, updateStatusDto)
      );
      return standardResponse(
        'Estado actualizado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al actualizar el estado: ' + error.message);
      return standardResponse(
        'Falló la actualización del estado',
        null
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await lastValueFrom(
        this.statusesService.remove(id)
      );
      return standardResponse(
        'Estado eliminado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al eliminar el estado: ' + error.message);
      return standardResponse(
        'Falló la eliminación del estado',
        null
      );
    }
  }
}

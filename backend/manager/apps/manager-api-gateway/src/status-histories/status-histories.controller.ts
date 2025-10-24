import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { StatusHistoriesService } from './status-histories.service';
import { lastValueFrom } from 'rxjs';
import { standardResponse } from '@app/standard-response';
import { CreateStatusHistoryDto } from '@app/contracts/status-history/DTO/create-status-history.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';
import { UpdateStatusHistoryDto } from '@app/contracts/status-history/DTO/update-status-history.dto';

@Controller('status-histories')
export class StatusHistoriesController {

  private readonly logger = new Logger(StatusHistoriesController.name);

  constructor(private readonly statusHistoriesService: StatusHistoriesService) {}

  @Get()
  async findAll() {
    try {
      const result = await lastValueFrom(this.statusHistoriesService.findAll());
      return standardResponse(
        'Historiales de estado obtenidos correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener los historiales de estado: ' + error.message);
      return standardResponse(
        'Falló la obtención de los historiales de estado',
        null
      );
    }
  }

  @Get(':id')
  async findOne(@Param() {id}: IdDto) {
    try {
      const result = await lastValueFrom(this.statusHistoriesService.findOne(id));
      return standardResponse(
        'Historial de estado obtenido correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener el historial de estado: ' + error.message);
      return standardResponse(
        'Falló la obtención del historial de estado',
        null
      );
    }
  }

  @Post()
  async create(@Body() createStatusHistoryDto: CreateStatusHistoryDto) {
    try {
      const result = await lastValueFrom(this.statusHistoriesService.create(createStatusHistoryDto));
      return standardResponse(
        'Historial de estado creado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al crear el historial de estado: ' + error.message);
      return standardResponse(
        'Falló la creación del historial de estado',
        null
      );
    }
  }

  @Put(':id')
  async update(@Param() id: IdDto, @Body() updateStatusHistoryDto: UpdateStatusHistoryDto) {
    try {
      const result = await lastValueFrom(this.statusHistoriesService.update(id, updateStatusHistoryDto));
      return standardResponse(
        'Historial de estado actualizado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al actualizar el historial de estado: ' + error.message);
      return standardResponse(
        'Falló la actualización del historial de estado',
        null
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await lastValueFrom(this.statusHistoriesService.remove(id));
      return standardResponse(
        'Historial de estado eliminado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al eliminar el historial de estado: ' + error.message);
      return standardResponse(
        'Falló la eliminación del historial de estado',
        null
      );
    }
  }

}

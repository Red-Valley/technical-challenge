import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { lastValueFrom } from 'rxjs';
import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { IdDto } from '@app/contracts/global-dto/id.dto';
import { standardResponse } from '@app/standard-response';

@Controller('providers')
export class ProvidersController {

  private readonly logger = new Logger(ProvidersController.name);

  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  async findAll(){
    try {
      const result = await lastValueFrom(this.providersService.findAll());
      return standardResponse(
        'Proveedores obtenidos correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener los proveedores: ' + error.message);
      return standardResponse(
        'Falló la obtención de los proveedores',
        null
      );
    }
  }

  @Get(':id')
  async findOne(@Param() id: IdDto) {
    try {
      const result = await lastValueFrom(
        this.providersService.findOne(id)
      );
      return standardResponse(
        'Proveedor obtenido correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al obtener el proveedor: ' + error.message);
      return standardResponse(
        'Falló la obtención del proveedor',
        null
      );
    }
  }

  @Post()
  async create(@Body() createProviderDto: CreateProviderDto) {
    try {
      const result = await lastValueFrom(
        this.providersService.create(createProviderDto)
      );
      return standardResponse(
        'Proveedor creado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al crear el proveedor: ' + error.message);
      return standardResponse(
        'Falló la creación del proveedor',
        null
      );
    }
  }

  @Put(':id')
  async update(
    @Param() id: IdDto,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    try {
      const result = await lastValueFrom(
        this.providersService.update(id, updateProviderDto)
      );
      return standardResponse(
        'Proveedor actualizado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al actualizar el proveedor: ' + error.message);
      return standardResponse(
        'Falló la actualización del proveedor',
        null
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await lastValueFrom(
        this.providersService.remove(id)
      );
      return standardResponse(
        'Proveedor eliminado correctamente',
        result
      );
    } catch (error) {
      this.logger.error('Error al eliminar el proveedor: ' + error.message);
      return standardResponse(
        'Falló la eliminación del proveedor',
        null
      );
    }
  }
}

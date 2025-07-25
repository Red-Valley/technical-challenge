import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StatusesService } from './statuses.service';

@ApiTags('statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @ApiOperation({ summary: 'Obtener todos los registros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de registros obtenida exitosamente',
  })
  @Get()
  async findAll() {
    return await this.statusesService.findAll();
  }

  @Get('hierarchy')
  async getHierarchy() {
    return await this.statusesService.getHierarchy();
  }

  @ApiOperation({ summary: 'Obtener registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro' })
  @ApiResponse({ status: 200, description: 'Registro encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.statusesService.findOne(id);
  }

  @Get(':id/next')
  async getValidNextStatuses(@Param('id') id: string) {
    return await this.statusesService.getValidNextStatuses(id);
  }
}

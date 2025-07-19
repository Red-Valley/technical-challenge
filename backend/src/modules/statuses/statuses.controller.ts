import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusesService } from './statuses.service';
import { CreateStatusDto, UpdateStatusDto } from './dto';

@ApiTags('statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estados' })
  @ApiResponse({ status: 200, description: 'Lista de estados' })
  findAll() {
    return this.statusesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo estado' })
  @ApiResponse({ status: 201, description: 'Estado creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusesService.create(createStatusDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estado por ID' })
  @ApiResponse({ status: 200, description: 'Estado encontrado' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado' })
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estado' })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusesService.update(id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estado' })
  @ApiResponse({ status: 200, description: 'Estado eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado' })
  @ApiResponse({ status: 400, description: 'No se puede eliminar estado con dependencias' })
  remove(@Param('id') id: string) {
    return this.statusesService.remove(id);
  }

  @Get('root')
  @ApiOperation({ summary: 'Obtener estados raíz (sin padre)' })
  @ApiResponse({ status: 200, description: 'Estados raíz' })
  findRootStatuses() {
    return this.statusesService.findRootStatuses();
  }

  @Get(':id/children')
  @ApiOperation({ summary: 'Obtener estados hijos de un estado' })
  @ApiResponse({ status: 200, description: 'Estados hijos' })
  findChildren(@Param('id') id: string) {
    return this.statusesService.findChildren(id);
  }
} 
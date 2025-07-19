import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@ApiTags('providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOperation({ summary: 'Crear nuevo registro' })
  @ApiResponse({ status: 201, description: 'Registro creado exitosamente' })
  @Post()
  async create(@Body(ValidationPipe) createProviderDto: CreateProviderDto) {
    return await this.providersService.create(createProviderDto);
  }

  @ApiOperation({ summary: 'Obtener todos los registros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de registros obtenida exitosamente',
  })
  @Get()
  async findAll() {
    return await this.providersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener registro por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro' })
  @ApiResponse({ status: 200, description: 'Registro encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.providersService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar registro' })
  @ApiParam({ name: 'id', description: 'ID del registro' })
  @ApiResponse({
    status: 200,
    description: 'Registro actualizado exitosamente',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProviderDto: UpdateProviderDto,
  ) {
    return await this.providersService.update(id, updateProviderDto);
  }

  @ApiOperation({ summary: 'Eliminar registro' })
  @ApiParam({ name: 'id', description: 'ID del registro' })
  @ApiResponse({ status: 200, description: 'Registro eliminado exitosamente' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.providersService.remove(id);
    return { message: 'Provider deleted successfully' };
  }
}

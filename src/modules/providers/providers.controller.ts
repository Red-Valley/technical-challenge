import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from '../../dto/create-provider.dto';
import { Provider } from '../../entities/provider.entity';

@ApiTags('providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiResponse({ status: 201, description: 'Provider created successfully' })
  create(@Body() createProviderDto: CreateProviderDto): Promise<Provider> {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all providers' })
  @ApiResponse({ status: 200, description: 'List of all providers' })
  findAll(): Promise<Provider[]> {
    return this.providersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a provider by ID' })
  @ApiResponse({ status: 200, description: 'Provider found' })
  @ApiResponse({ status: 404, description: 'Provider not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Provider> {
    return this.providersService.findOne(id);
  }
}

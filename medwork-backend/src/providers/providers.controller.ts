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
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  async create(@Body(ValidationPipe) createProviderDto: CreateProviderDto) {
    return await this.providersService.create(createProviderDto);
  }

  @Get()
  async findAll() {
    return await this.providersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.providersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProviderDto: UpdateProviderDto,
  ) {
    return await this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.providersService.remove(id);
    return { message: 'Provider deleted successfully' };
  }
}

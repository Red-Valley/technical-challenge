import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Observable } from 'rxjs';
import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { IdDto } from '@app/contracts/global-dto/id.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  findAll(): Observable<Provider[]> {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: IdDto): Observable<Provider> {
    return this.providersService.findOne(id);
  }

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Put(':id')
  update(
    @Param() id: IdDto,
    @Body() updateProviderDto: UpdateProviderDto,
  ): Observable<Provider> {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<{ message: string }> {
    return this.providersService.remove(id);
  }
}

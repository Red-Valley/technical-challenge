import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderWithIdDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { PROVIDERS_PATTERNS } from '@app/contracts/providers/patterns/providers.patterns';
import { IdDto } from '@app/contracts/global-dto/id.dto';

@Controller()
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @MessagePattern(PROVIDERS_PATTERNS.CREATE)
  create(@Payload() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @MessagePattern(PROVIDERS_PATTERNS.FIND_ALL)
  findAll() {
    return this.providersService.findAll();
  }

  @MessagePattern(PROVIDERS_PATTERNS.FIND_ONE)
  findOne(@Payload() { id }: IdDto) {
    return this.providersService.findOne(id);
  }

  @MessagePattern(PROVIDERS_PATTERNS.UPDATE)
  update(@Payload() updateProviderDto: UpdateProviderWithIdDto) {
    const { id, ...updateData } = updateProviderDto;
    return this.providersService.update(id, updateData);
  }

  @MessagePattern(PROVIDERS_PATTERNS.REMOVE)
  remove(@Payload() id: string) {
    return this.providersService.remove(id);
  }
}

import { Controller } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { MessagePattern } from '@nestjs/microservices';
import { PROVIDERS_PATTERNS } from '@app/contracts/providers/patterns/providers.patterns';

@Controller()
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @MessagePattern(PROVIDERS_PATTERNS.FIND_ALL)
  findAll() {
    return this.providersService.findAll();
  }

  @MessagePattern(PROVIDERS_PATTERNS.FIND_ONE)
  findOne(data: { id: string }) {
    return this.providersService.findOne(data.id);
  }

  @MessagePattern(PROVIDERS_PATTERNS.CREATE)
  create(data: any) {
    return this.providersService.create(data);
  }

  @MessagePattern(PROVIDERS_PATTERNS.UPDATE)
  update(data: { id: string; updateProviderDto: any }) {
    return this.providersService.update(data.id, data.updateProviderDto);
  }

  @MessagePattern(PROVIDERS_PATTERNS.REMOVE)
  remove(data: { id: string }) {
    return this.providersService.remove(data.id);
  }
}

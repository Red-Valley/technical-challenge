import { IdDto } from '@app/contracts/global-dto/id.dto';
import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { PROVIDERS_PATTERNS } from '@app/contracts/providers/patterns/providers.patterns';
import { PROVIDERS_SERVICE_NAME } from '@app/contracts/providers/providers.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProvidersService {

  constructor(
    @Inject(PROVIDERS_SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  findAll() {
    return this.client.send<Provider[]>(PROVIDERS_PATTERNS.FIND_ALL, {})
  }

  findOne(id: IdDto) {
    return this.client.send<Provider>(PROVIDERS_PATTERNS.FIND_ONE, id);
  }

  create(createProviderDto: CreateProviderDto) {
  return this.client
    .send<Provider>(PROVIDERS_PATTERNS.CREATE, createProviderDto);
}

  update(
    id: IdDto,
    updateProviderDto: UpdateProviderDto,
  ) {
    return this.client
      .send<Provider>(PROVIDERS_PATTERNS.UPDATE, {
        ...id,
        ...updateProviderDto,
      });
  }

  remove(id: string) {
    return this.client.send<boolean>(PROVIDERS_PATTERNS.REMOVE, { id });
  }
}

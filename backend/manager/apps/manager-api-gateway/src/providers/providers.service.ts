import { IdDto } from '@app/contracts/global-dto/id.dto';
import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { PROVIDERS_PATTERNS } from '@app/contracts/providers/patterns/providers.patterns';
import { PROVIDERS_SERVICE_NAME } from '@app/contracts/providers/providers.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProvidersService {
  constructor(@Inject(PROVIDERS_SERVICE_NAME) private readonly client: ClientProxy) {}

  findAll(): Observable<Provider[]> {
    return this.client.send<Provider[]>(PROVIDERS_PATTERNS.FIND_ALL, {}).pipe(
      map((providers) => {
        if (!providers) {
          throw new NotFoundException('No se encontraron proveedores');
        }
        return providers;
      }),
    );
  }

  findOne(id: IdDto): Observable<Provider> {
    return this.client.send<Provider>(PROVIDERS_PATTERNS.FIND_ONE, id).pipe(
      map((provider) => {
        if (!provider) {
          throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
        }
        return provider;
      }),
    );
  }

  create(createProviderDto: CreateProviderDto): Observable<Provider> {
    return this.client.send<Provider>(PROVIDERS_PATTERNS.CREATE, createProviderDto);
  }

  update(id: IdDto, updateProviderDto: UpdateProviderDto): Observable<Provider> {
    return this.client
      .send<Provider>(PROVIDERS_PATTERNS.UPDATE, { ...id, ...updateProviderDto })
      .pipe(
        map((updated) => {
          if (!updated) {
            throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
          }
          return updated;
        }),
      );
  }

  remove(id: string): Observable<{ message: string }> {
    return this.client.send<boolean>(PROVIDERS_PATTERNS.REMOVE, { id }).pipe(
      map((deleted) => {
        if (!deleted) {
          throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
        }
        return { message: 'Proveedor eliminado correctamente' };
      }),
    );
  }
}

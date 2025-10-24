import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvidersDao } from './providers.dao';

@Injectable()
export class ProvidersService {
  constructor(
    private providersDao: ProvidersDao
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providersDao.create(createProviderDto);
  }

  findAll() {
    return this.providersDao.findAll();
  }

  findOne(id: string) {
    return this.providersDao.findOne(id);
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    return this.providersDao.update(id, updateProviderDto);
  }

  async remove(id: string) {
    return this.providersDao.remove(id);
  }
}

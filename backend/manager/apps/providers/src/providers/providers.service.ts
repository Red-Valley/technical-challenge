import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { UpdateProviderDto } from '@app/contracts/providers/DTO/update-provider.dto';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    const provider = this.providersRepository.create(createProviderDto);
    return this.providersRepository.save(provider);
  }

  findAll() {
    return this.providersRepository.find();
  }

  findOne(id: string) {
    return this.providersRepository.findOne({ where: { id } });
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return this.providersRepository.update(id, updateProviderDto);
  }

  remove(id: string) {
    return this.providersRepository.delete(id);
  }
}

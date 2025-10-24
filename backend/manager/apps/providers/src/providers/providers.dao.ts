import { CreateProviderDto } from '@app/contracts/providers/DTO/create-provider.dto';
import { Provider } from '@app/contracts/providers/entities/provider.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersDao {

  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>
  ) {}

  create(provider: CreateProviderDto) {
    const newProvider = this.providersRepository.create(provider);
    return this.providersRepository.save(newProvider);
  }

  findAll() {
    return this.providersRepository.find();
  }

  findOne(id: string) {
    return this.providersRepository.findOne({ where: { id } });
  }

  async update(id: string, provider: Partial<Provider>) {
    const updatedProvider = await this.providersRepository.update(id, provider);
    return !!updatedProvider.affected;
  }

  async remove(id: string) {
    const deletedProvider = await this.providersRepository.delete(id);
    return !!deletedProvider.affected;
  }
}

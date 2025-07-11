import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../entities/provider.entity';
import { CreateProviderDto } from '../../dto/create-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providersRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providersRepository.create(createProviderDto);
    return this.providersRepository.save(provider);
  }

  async findAll(): Promise<Provider[]> {
    return this.providersRepository.find({
      relations: ['patients'],
    });
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.providersRepository.findOne({
      where: { id },
      relations: ['patients'],
    });
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }
    return provider;
  }
}

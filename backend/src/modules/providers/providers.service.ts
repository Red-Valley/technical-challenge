import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider, Patient } from '../../entities';
import { CreateProviderDto, UpdateProviderDto } from './dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(createProviderDto);
    return await this.providerRepository.save(provider);
  }

  async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.findOne(id);
    Object.assign(provider, updateProviderDto);
    return await this.providerRepository.save(provider);
  }

  async remove(id: string): Promise<void> {
    const provider = await this.findOne(id);

    // Check if provider is being used by patients
    const patientsUsingProvider = await this.patientRepository.find({
      where: { provider_id: id }
    });

    if (patientsUsingProvider.length > 0) {
      throw new BadRequestException(`Cannot delete provider that is being used by ${patientsUsingProvider.length} patient(s). Please reassign patients to another provider first.`);
    }

    // If no dependencies, proceed with deletion
    await this.providerRepository.remove(provider);
  }
} 
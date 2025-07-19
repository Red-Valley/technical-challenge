import { DataSource } from 'typeorm';
import { Provider } from '../../providers/provider.entity';

export async function seedProviders(dataSource: DataSource) {
  const providerRepository = dataSource.getRepository(Provider);

  // Verificar si ya existen datos
  const existingProviders = await providerRepository.count();
  if (existingProviders > 0) {
    console.log('Providers already seeded');
    return;
  }

  console.log('Seeding providers...');

  const providers = [
    { fullName: 'Dr. María González', specialty: 'Cardiología' },
    { fullName: 'Dr. Juan Pérez', specialty: 'Medicina General' },
    { fullName: 'Dra. Ana Rodríguez', specialty: 'Pediatría' },
    { fullName: 'Dr. Carlos López', specialty: 'Dermatología' },
    { fullName: 'Dra. Laura Martínez', specialty: 'Ginecología' },
  ];

  for (const providerData of providers) {
    await providerRepository.save(providerData);
  }

  console.log('Providers seeded successfully!');
}
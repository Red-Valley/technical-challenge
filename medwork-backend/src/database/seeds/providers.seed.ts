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
    { fullName: 'Dr. María González', specialty: 'Cardiology' },
    { fullName: 'Dr. Juan Pérez', specialty: 'General Medicine' },
    { fullName: 'Dra. Ana Rodríguez', specialty: 'Pediatrics' },
    { fullName: 'Dr. Carlos López', specialty: 'Dermatology' },
    { fullName: 'Dra. Laura Martínez', specialty: 'Gynecology' },
  ];

  for (const providerData of providers) {
    await providerRepository.save(providerData);
  }

  console.log('Providers seeded successfully!');
}
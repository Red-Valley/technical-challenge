import { DataSource } from 'typeorm';
import { Status } from '../../statuses/status.entity';

export async function seedStatuses(dataSource: DataSource) {
  const statusRepository = dataSource.getRepository(Status);

  const existingStatuses = await statusRepository.count();
  if (existingStatuses > 0) {
    console.log('Statuses already seeded');
    return;
  }

  console.log('Seeding statuses...');

  // NIVEL 1: Raíz
  const scheduled = await statusRepository.save({
    name: 'Scheduled',
    parentId: null,
    order: 1,
  });

  // NIVEL 2: Hijos de Scheduled
  const checkedIn = await statusRepository.save({
    name: 'Checked-In',
    parentId: scheduled.id,
    order: 2,
  });

  const _noShow = await statusRepository.save({
    name: 'No-Show',
    parentId: scheduled.id,
    order: 5,
  });

  // NIVEL 3: Hijos de Checked-In
  await statusRepository.save({
    name: 'In Consultation',
    parentId: checkedIn.id,
    order: 3,
  });

  await statusRepository.save({
    name: 'Cancelled',
    parentId: checkedIn.id,
    order: 4,
  });

  console.log('Statuses seeded successfully!');
}
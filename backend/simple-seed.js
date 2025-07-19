require('dotenv').config();
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'medwork_db',
  synchronize: false,
  logging: true,
  entities: [],
  migrations: [],
  subscribers: [],
});

async function seedStatuses() {
  console.log('🌱 Cargando estados...');
  
  try {
    // Primero, limpiar estados existentes para evitar conflictos
    await AppDataSource.query(`DELETE FROM statuses WHERE name IN ('Scheduled', 'Checked-In', 'No-Show', 'In Consultation', 'Cancelled')`);
    
    // Crear estados en orden correcto
    await AppDataSource.query(`
      INSERT INTO statuses (id, name, parent_id, "order", created_at) VALUES
      (gen_random_uuid(), 'Scheduled', NULL, 1, NOW())
      ON CONFLICT (name) DO NOTHING;
    `);
    
    await AppDataSource.query(`
      INSERT INTO statuses (id, name, parent_id, "order", created_at) VALUES
      (gen_random_uuid(), 'Checked-In', (SELECT id FROM statuses WHERE name = 'Scheduled'), 1, NOW()),
      (gen_random_uuid(), 'No-Show', (SELECT id FROM statuses WHERE name = 'Scheduled'), 2, NOW())
      ON CONFLICT (name) DO NOTHING;
    `);
    
    await AppDataSource.query(`
      INSERT INTO statuses (id, name, parent_id, "order", created_at) VALUES
      (gen_random_uuid(), 'In Consultation', (SELECT id FROM statuses WHERE name = 'Checked-In'), 1, NOW()),
      (gen_random_uuid(), 'Cancelled', (SELECT id FROM statuses WHERE name = 'Checked-In'), 2, NOW())
      ON CONFLICT (name) DO NOTHING;
    `);
    
    console.log('✅ Estados cargados exitosamente');
  } catch (error) {
    console.error('❌ Error cargando estados:', error);
    throw error;
  }
}

async function seedProviders() {
  console.log('👨‍⚕️ Cargando proveedores...');
  
  try {
    // Limpiar proveedores existentes para evitar conflictos
    await AppDataSource.query(`DELETE FROM providers WHERE full_name IN ('Dr. María González', 'Dr. Carlos Rodríguez', 'Dra. Ana Martínez', 'Dr. Luis Pérez')`);
    
    await AppDataSource.query(`
      INSERT INTO providers (id, full_name, specialty, created_at) VALUES
      (gen_random_uuid(), 'Dr. María González', 'Cardiología', NOW()),
      (gen_random_uuid(), 'Dr. Carlos Rodríguez', 'Dermatología', NOW()),
      (gen_random_uuid(), 'Dra. Ana Martínez', 'Pediatría', NOW()),
      (gen_random_uuid(), 'Dr. Luis Pérez', 'Ortopedia', NOW());
    `);
    
    console.log('✅ Proveedores cargados exitosamente');
  } catch (error) {
    console.error('❌ Error cargando proveedores:', error);
    throw error;
  }
}

async function createTables() {
  console.log('🏗️ Creando tablas...');
  
  // Crear tabla statuses
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS statuses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL UNIQUE,
      parent_id UUID REFERENCES statuses(id),
      "order" INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Crear tabla providers
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS providers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name VARCHAR(255) NOT NULL,
      specialty VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Agregar restricción única si no existe
  try {
    await AppDataSource.query(`
      ALTER TABLE providers ADD CONSTRAINT providers_full_name_unique UNIQUE (full_name);
    `);
  } catch (error) {
    // La restricción ya existe, ignorar error
    console.log('ℹ️ Restricción única ya existe en providers.full_name');
  }
  
  // Crear tabla patients
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      provider_id UUID REFERENCES providers(id),
      status_id UUID REFERENCES statuses(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Crear tabla status_history
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS status_history (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_id UUID NOT NULL REFERENCES patients(id),
      status_id UUID NOT NULL REFERENCES statuses(id),
      changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log('✅ Tablas creadas exitosamente');
}

async function runSeeds() {
  try {
    console.log('🌱 Iniciando carga de datos...');
    
    await AppDataSource.initialize();
    console.log('✅ Conexión a la base de datos establecida');

    await createTables();
    await seedStatuses();
    await seedProviders();

    console.log('🎉 Todos los seeds se ejecutaron exitosamente');
  } catch (error) {
    console.error('❌ Error ejecutando seeds:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('🔌 Conexión a la base de datos cerrada');
  }
}

runSeeds(); 
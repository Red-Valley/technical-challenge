const { sequelize, Patient, Provider } = require('../models/index');

async function testDB() {
  await sequelize.authenticate();
  console.log('🔗 Conexión exitosa a la base de datos.');

  const providers = await Provider.findAll();
  console.log('👨‍⚕️ Proveedores encontrados:', providers.length);

  const patients = await Patient.findAll({ include: Provider });
  console.log('🧍 Pacientes encontrados:', patients.length);
}

testDB().catch(console.error);

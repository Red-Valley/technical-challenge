import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Medwork API')
  .setDescription(
    `
    ## Descripción
    API para gestión de pacientes, proveedores médicos y estados clínicos en el sistema Medwork.
    
    ## Características principales
    - **Gestión de pacientes**: Crear, leer, actualizar y eliminar pacientes
    - **Gestión de proveedores**: Administrar proveedores médicos y sus especialidades
    - **Estados clínicos**: Controlar el estado de los pacientes durante su tratamiento
    - **Historial de cambios**: Seguimiento de cambios en el estado clínico de los pacientes
    
    ## Autenticación
    Actualmente la API no requiere autenticación para desarrollo.
    
    ## Base URL
    \`http://localhost:3000\`
  `,
  )
  .setVersion('1.0')
  .addTag('patients', 'Gestión de pacientes del sistema')
  .addTag('providers', 'Gestión de proveedores médicos')
  .addTag('statuses', 'Gestión de estados clínicos')
  .addTag('status-history', 'Historial de cambios de estado')
  .addServer('http://localhost:3000', 'Servidor de desarrollo')
  .addServer('https://api.medwork.com', 'Servidor de producción')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();

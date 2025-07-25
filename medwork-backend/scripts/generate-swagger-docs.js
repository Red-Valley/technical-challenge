const fs = require('fs');
const path = require('path');

// Función para generar decoradores de Swagger básicos
function generateSwaggerDecorators(controllerPath) {
  const content = fs.readFileSync(controllerPath, 'utf8');
  
  // Verificar si ya tiene decoradores de Swagger
  if (content.includes('@ApiTags') || content.includes('@ApiOperation')) {
    console.log(`✅ ${controllerPath} ya tiene decoradores de Swagger`);
    return;
  }

  // Generar decoradores básicos
  let newContent = content;
  
  // Agregar import de Swagger
  if (!content.includes('@nestjs/swagger')) {
    const importIndex = content.indexOf('import {');
    const endImportIndex = content.indexOf('} from \'@nestjs/common\';');
    
    if (endImportIndex !== -1) {
      const swaggerImport = `import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';`;
      newContent = content.slice(0, endImportIndex + 1) + '\n' + swaggerImport + content.slice(endImportIndex + 1);
    }
  }

  // Agregar @ApiTags al controlador
  const controllerMatch = content.match(/@Controller\(['"]([^'"]+)['"]\)/);
  if (controllerMatch) {
    const tag = controllerMatch[1].replace('/', '');
    const apiTagsDecorator = `@ApiTags('${tag}')`;
    newContent = newContent.replace(/@Controller\(/, apiTagsDecorator + '\n@Controller(');
  }

  // Agregar decoradores básicos a los métodos
  const methodDecorators = {
    '@Post()': '@ApiOperation({ summary: \'Crear nuevo registro\' })\n  @ApiResponse({ status: 201, description: \'Registro creado exitosamente\' })',
    '@Get()': '@ApiOperation({ summary: \'Obtener todos los registros\' })\n  @ApiResponse({ status: 200, description: \'Lista de registros obtenida exitosamente\' })',
    '@Get(\':id\')': '@ApiOperation({ summary: \'Obtener registro por ID\' })\n  @ApiParam({ name: \'id\', description: \'ID del registro\' })\n  @ApiResponse({ status: 200, description: \'Registro encontrado exitosamente\' })\n  @ApiResponse({ status: 404, description: \'Registro no encontrado\' })',
    '@Patch(\':id\')': '@ApiOperation({ summary: \'Actualizar registro\' })\n  @ApiParam({ name: \'id\', description: \'ID del registro\' })\n  @ApiResponse({ status: 200, description: \'Registro actualizado exitosamente\' })',
    '@Delete(\':id\')': '@ApiOperation({ summary: \'Eliminar registro\' })\n  @ApiParam({ name: \'id\', description: \'ID del registro\' })\n  @ApiResponse({ status: 200, description: \'Registro eliminado exitosamente\' })'
  };

  Object.entries(methodDecorators).forEach(([decorator, swaggerDecorators]) => {
    newContent = newContent.replace(decorator, swaggerDecorators + '\n  ' + decorator);
  });

  // Escribir el archivo actualizado
  fs.writeFileSync(controllerPath, newContent);
  console.log(`✅ Generados decoradores de Swagger para ${controllerPath}`);
}

// Buscar todos los controladores
function findControllers(dir) {
  const controllers = [];
  
  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.controller.ts') && !file.endsWith('.spec.ts')) {
        controllers.push(filePath);
      }
    });
  }
  
  scanDirectory(dir);
  return controllers;
}

// Ejecutar el script
const srcDir = path.join(__dirname, '../src');
const controllers = findControllers(srcDir);

console.log('🔍 Encontrados controladores:');
controllers.forEach(controller => console.log(`  - ${controller}`));

console.log('\n📝 Generando decoradores de Swagger...');
controllers.forEach(generateSwaggerDecorators);

console.log('\n✅ Proceso completado!');

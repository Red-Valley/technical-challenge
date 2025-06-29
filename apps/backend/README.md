# 🏥 Backend - Sistema de Gestión de Pacientes

Sistema backend desarrollado con **NestJS**, **Prisma** y **PostgreSQL** para la gestión de pacientes con estados jerárquicos y seguimiento de historial.

> **Parte del monorepo técnico** - Este backend está integrado en una arquitectura de monorepo usando TurboRepo con frontend Next.js.

## 📋 Tabla de Contenidos

- [🏗️ Arquitectura](#️-arquitectura)
- [🗄️ Esquema de Base de Datos](#️-esquema-de-base-de-datos)
- [🚀 Configuración y Ejecución](#-configuración-y-ejecución)
- [🐳 Desarrollo con Docker](#-desarrollo-con-docker)
- [📚 API Endpoints](#-api-endpoints)
- [🧪 Health Check](#-health-check)
- [🔧 Utilidades Comunes](#-utilidades-comunes)
- [🛡️ Manejo de Errores](#️-manejo-de-errores)
- [🔍 Validaciones](#-validaciones)
- [🌐 Configuración de CORS](#-configuración-de-cors)
- [🧪 Datos de Prueba](#-datos-de-prueba)
- [🔗 Integración con Monorepo](#-integración-con-monorepo)

## 🏗️ Arquitectura

```
src/
├── common/               # Utilidades compartidas
│   ├── interfaces/       # Interfaces de respuesta
│   ├── utils/           # Funciones de utilidad
│   ├── filters/         # Filtros globales
│   └── index.ts         # Exportaciones
├── health/              # Health Check
│   ├── health.controller.ts
│   ├── health.service.ts
│   └── health.module.ts
├── prisma/              # Configuración de Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── providers/           # Módulo de Proveedores
│   ├── dto/
│   ├── providers.controller.ts
│   ├── providers.service.ts
│   └── providers.module.ts
├── patients/            # Módulo de Pacientes
│   ├── dto/
│   ├── patients.controller.ts
│   ├── patients.service.ts
│   └── patients.module.ts
├── statuses/            # Módulo de Estados
│   ├── statuses.controller.ts
│   ├── statuses.service.ts
│   └── statuses.module.ts
├── app.module.ts        # Módulo principal
└── main.ts             # Punto de entrada
```

### Características Principales

- ✅ **Arquitectura modular** con NestJS
- ✅ **Base de datos** PostgreSQL con Prisma ORM
- ✅ **Respuestas consistentes** con utilidades comunes
- ✅ **Manejo global de errores** con filtros personalizados
- ✅ **Health checks** para monitoreo
- ✅ **Validación automática** de DTOs
- ✅ **Historial de estados** automático
- ✅ **CORS configurado** para el frontend
- ✅ **Integración con monorepo** TurboRepo
- ✅ **Docker optimizado** con multi-stage builds

## 🗄️ Esquema de Base de Datos

### Entidades Principales

#### 1. **Providers** (Proveedores)

```sql
- id: UUID (PK)
- full_name: string
- specialty: string
- created_at: datetime
```

#### 2. **Statuses** (Estados) - Con Jerarquía

```sql
- id: UUID (PK)
- name: string
- parent_id: UUID (FK to statuses, nullable)
- order: integer
```

#### 3. **Patients** (Pacientes)

```sql
- id: UUID (PK)
- full_name: string
- email: string (unique)
- phone: string
- provider_id: UUID (FK to providers)
- status_id: UUID (FK to statuses)
- created_at: datetime
```

#### 4. **Status History** (Historial de Estados)

```sql
- id: UUID (PK)
- patient_id: UUID (FK to patients)
- status_id: UUID (FK to statuses)
- changed_at: datetime
```

### 🌳 Jerarquía de Estados Predefinida

```
Scheduled
├── Checked-In
│   ├── In Consultation
│   └── Cancelled
└── No-Show
```

## 🚀 Configuración y Ejecución

### Opción 1: Desarrollo Nativo (Bun)

#### 1. Instalar Dependencias

```bash
# Desde la raíz del monorepo
bun install

# O desde el directorio del backend
cd apps/backend && bun install
```

#### 2. Configurar Variables de Entorno

Crea un archivo `.env` en `apps/backend/` con:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/technical_challenge?schema=public"
```

#### 3. Configurar Base de Datos

```bash
# Generar cliente de Prisma
bun run prisma:generate

# Sincronizar esquema con la BD
bun run prisma:push

# Poblar con datos iniciales
bun run prisma:seed
```

#### 4. Ejecutar Servidor

```bash
# Modo desarrollo
bun run dev

# Modo producción
bun run build
bun run start:prod
```

### Opción 2: Desarrollo con Docker (Recomendado)

#### Usando Scripts de Conveniencia

```bash
# Iniciar todos los servicios (backend, frontend, BD, adminer)
./docker-scripts.sh dev

# Solo backend
./docker-scripts.sh dev-backend

# Ver logs
./docker-scripts.sh logs-backend

# Acceder a shell del backend
./docker-scripts.sh shell-backend
```

#### Usando Docker Compose Directamente

```bash
# Construir e iniciar servicios
docker-compose up --build

# Solo backend
docker-compose up backend

# En segundo plano
docker-compose up -d
```

### 🔧 Comandos de Prisma Disponibles

```bash
# Generar cliente
bun run prisma:generate

# Push esquema a BD
bun run prisma:push

# Crear migración
bun run prisma:migrate

# Reset BD
bun run prisma:reset

# Ejecutar seed
bun run prisma:seed

# Abrir Prisma Studio
bun run prisma:studio
```

## 🐳 Desarrollo con Docker

### Servicios Disponibles

- **Backend**: http://localhost:3000 (API NestJS)
- **Frontend**: http://localhost:3001 (Next.js App)
- **PostgreSQL**: localhost:5432 (Base de datos)
- **Adminer**: http://localhost:8080 (Gestión de BD)

### Comandos de Docker

```bash
# Gestión principal
./docker-scripts.sh dev           # Iniciar desarrollo completo
./docker-scripts.sh status        # Ver estado de servicios
./docker-scripts.sh stop          # Detener servicios
./docker-scripts.sh restart       # Reiniciar servicios
./docker-scripts.sh clean         # Limpiar todo

# Logs
./docker-scripts.sh logs          # Ver todos los logs
./docker-scripts.sh logs-backend  # Solo logs backend
./docker-scripts.sh logs-frontend # Solo logs frontend
./docker-scripts.sh logs-db       # Solo logs base de datos

# Shells
./docker-scripts.sh shell-backend  # Terminal en backend
./docker-scripts.sh shell-frontend # Terminal en frontend
./docker-scripts.sh shell-db       # Terminal en PostgreSQL

# Base de datos
./docker-scripts.sh db-reset       # ⚠️ Reiniciar base de datos
```

### Características de Docker

- ✅ **Hot reload** para desarrollo
- ✅ **Multi-stage builds** para optimización
- ✅ **Health checks** automáticos
- ✅ **Volúmenes** para persistencia
- ✅ **Networking** interno configurado
- ✅ **Variables de entorno** gestionadas

## 📚 API Endpoints

Todas las rutas tienen el prefijo `/api`. Ejemplo: `http://localhost:3000/api/patients`

### 🔍 Proveedores (`/api/providers`)

| Método | Endpoint                   | Descripción                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/api/providers`           | Listar todos los proveedores |
| GET    | `/api/providers/:id`       | Obtener proveedor específico |
| GET    | `/api/providers/:id/stats` | Estadísticas del proveedor   |
| POST   | `/api/providers`           | Crear nuevo proveedor        |

#### Ejemplo POST `/api/providers`:

```json
{
	"full_name": "Dr. Juan Pérez",
	"specialty": "Cardiología"
}
```

### 👥 Pacientes (`/api/patients`)

| Método | Endpoint                           | Descripción                    |
| ------ | ---------------------------------- | ------------------------------ |
| GET    | `/api/patients`                    | Listar todos los pacientes     |
| GET    | `/api/patients?provider=:id`       | Pacientes por proveedor        |
| GET    | `/api/patients?status=:id`         | Pacientes por estado           |
| GET    | `/api/patients/:id`                | Obtener paciente específico    |
| GET    | `/api/patients/:id/status-history` | Historial de estados           |
| POST   | `/api/patients`                    | Crear nuevo paciente           |
| PATCH  | `/api/patients/:id/status`         | Actualizar estado del paciente |

#### Ejemplo POST `/api/patients`:

```json
{
	"full_name": "María González",
	"email": "maria@email.com",
	"phone": "+52 555 123 4567",
	"provider_id": "uuid-del-proveedor",
	"status_id": "uuid-del-estado"
}
```

#### Ejemplo PATCH `/api/patients/:id/status`:

```json
{
	"status_id": "uuid-del-nuevo-estado"
}
```

### 📊 Estados (`/api/statuses`)

| Método | Endpoint                        | Descripción                  |
| ------ | ------------------------------- | ---------------------------- |
| GET    | `/api/statuses`                 | Listar todos los estados     |
| GET    | `/api/statuses/hierarchy`       | Obtener jerarquía de estados |
| GET    | `/api/statuses/stats`           | Estadísticas de estados      |
| GET    | `/api/statuses/:id`             | Obtener estado específico    |
| GET    | `/api/statuses/:id/path`        | Ruta completa del estado     |
| GET    | `/api/statuses/:id/children`    | Estados hijos                |
| GET    | `/api/statuses/:id/transitions` | Transiciones disponibles     |

## 🧪 Health Check

Sistema de monitoreo que verifica el estado de la aplicación y sus dependencias.

### Endpoints Disponibles

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/health`          | Health check completo        |
| GET    | `/api/health/ready`    | Readiness check (Kubernetes) |
| GET    | `/api/health/live`     | Liveness check (Kubernetes)  |
| GET    | `/api/health/simple`   | Status simple y rápido       |
| GET    | `/api/health/database` | Solo verificación de BD      |

### Health Check Completo - `GET /api/health`

Proporciona un estado completo del sistema:

```json
{
	"message": "System is healthy",
	"data": {
		"status": "healthy",
		"timestamp": "2024-01-15T10:30:00.000Z",
		"uptime": 3600,
		"version": "1.0.0",
		"database": {
			"status": "connected",
			"responseTime": 15
		},
		"services": {
			"api": {
				"status": "running",
				"pid": 12345
			}
		},
		"memory": {
			"used": 45,
			"total": 128,
			"percentage": 35
		}
	}
}
```

**Estados posibles:**

- `healthy`: Todo funcionando correctamente
- `degraded`: Funcionando con advertencias (ej. alta memoria)
- `unhealthy`: Sistema no saludable (ej. BD desconectada)

### Configuración para Kubernetes

```yaml
# Liveness Probe
livenessProbe:
  httpGet:
    path: /api/health/live
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

# Readiness Probe
readinessProbe:
  httpGet:
    path: /api/health/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## 🔧 Utilidades Comunes

Sistema de utilidades para respuestas consistentes y manejo de errores.

### Interfaces de Respuesta

#### `ApiResponse<T>`

Interfaz estándar para todas las respuestas exitosas:

```typescript
interface ApiResponse<T = any> {
	message: string
	data: T
	count?: number
}
```

#### `ApiErrorResponse`

Interfaz para respuestas de error formateadas:

```typescript
interface ApiErrorResponse {
	statusCode: number
	message: string | string[]
	error: string
	timestamp: string
	path: string
}
```

### Funciones de Respuesta

#### Funciones Básicas

```typescript
// Respuesta básica de éxito
createSuccessResponse<T>(message: string, data: T, count?: number): ApiResponse<T>

// Para datos únicos
createDataResponse<T>(message: string, data: T): ApiResponse<T>
```

#### Funciones Específicas por Operación

```typescript
// Para recursos creados (POST)
createCreatedResponse<T>(resourceName: string, data: T): ApiResponse<T>

// Para recursos actualizados (PUT/PATCH)
createUpdatedResponse<T>(resourceName: string, data: T): ApiResponse<T>

// Para un recurso recuperado (GET /:id)
createRetrievedResponse<T>(resourceName: string, data: T): ApiResponse<T>

// Para múltiples recursos (GET)
createRetrievedListResponse<T>(resourceName: string, data: T[]): ApiResponse<T[]>
```

#### Ejemplo de Uso

**Antes:**

```typescript
@Get()
async findAll() {
  const patients = await this.patientsService.findAll()
  return {
    message: 'Patients retrieved successfully',
    data: patients,
    count: patients.length
  }
}
```

**Después:**

```typescript
import { ApiResponse, createRetrievedListResponse } from '../common'

@Get()
async findAll(): Promise<ApiResponse> {
  const patients = await this.patientsService.findAll()
  return createRetrievedListResponse('Patients', patients)
}
```

## 🛡️ Manejo de Errores

El `GlobalExceptionFilter` captura y formatea automáticamente todos los errores:

### Errores Manejados

1. **Excepciones HTTP de NestJS**: `NotFoundException`, `ConflictException`, etc.
2. **Errores de Prisma**: Códigos específicos de base de datos
3. **Errores de Validación**: Del ValidationPipe
4. **Errores Inesperados**: Errores internos del servidor

### Códigos de Error de Prisma

- `P2002`: Violación de restricción única → `409 Conflict`
- `P2025`: Registro no encontrado → `404 Not Found`
- `P2003`: Violación de clave foránea → `400 Bad Request`
- `P2014`: Violación de relación requerida → `400 Bad Request`

### Ejemplo de Error Formateado

```json
{
	"statusCode": 404,
	"message": "Patient with ID 123 not found",
	"error": "Not Found",
	"timestamp": "2024-01-15T10:30:00.000Z",
	"path": "/api/patients/123"
}
```

### Configuración

El filtro está configurado globalmente en `main.ts`:

```typescript
app.useGlobalFilters(new GlobalExceptionFilter())
```

## 🔍 Validaciones

### Validaciones Implementadas

- ✅ **Validación de DTOs** con `class-validator`
- ✅ **Transformación automática** de datos
- ✅ **Validación de relaciones** (proveedor y estado existen)
- ✅ **Emails únicos** en pacientes
- ✅ **Validación de transiciones** de estado
- ✅ **Historial automático** de estados

### Configuración Global

```typescript
app.useGlobalPipes(
	new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true
	})
)
```

## 🌐 Configuración de CORS

CORS configurado para permitir conexiones desde el frontend:

```typescript
app.enableCors({
	origin: ['http://localhost:3001', 'http://frontend:3001'],
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	credentials: true
})
```

## 🧪 Datos de Prueba

El seed incluye:

- **4 Proveedores** con diferentes especialidades:
  - Dr. María García López (Cardiología)
  - Dr. Juan Carlos Mendoza (Medicina General)
  - Dra. Ana Isabel Rodríguez (Pediatría)
  - Dr. Carlos Alberto Vega (Dermatología)

- **5 Estados** con jerarquía completa:
  - Scheduled → Checked-In → In Consultation
  - Scheduled → Checked-In → Cancelled
  - Scheduled → No-Show

- **4 Pacientes** de ejemplo con diferentes estados
- **Historial de estados** para demostrar funcionalidad

### Ejecutar Seed

```bash
bun run prisma:seed
```

## 🔗 Integración con Monorepo

### Scripts del Monorepo

```bash
# Desde la raíz del proyecto
bun dev:backend          # Ejecutar solo backend
bun dev                  # Ejecutar backend + frontend
bun build:backend        # Build del backend
bun lint:backend         # Lint del backend
bun test:backend         # Tests del backend
```

### Estructura del Monorepo

```
technical-challenge/
├── apps/
│   ├── backend/         # Este proyecto
│   └── frontend/        # Next.js app
├── packages/
│   ├── eslint-config/   # Configuración ESLint compartida
│   └── typescript-config/ # Configuración TS compartida
├── docker-compose.yml   # Orquestación de servicios
└── docker-scripts.sh    # Scripts de conveniencia
```

### Variables de Entorno Compartidas

El backend utiliza variables de entorno que pueden ser configuradas a nivel de monorepo:

```env
# Base de datos
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/technical_challenge?schema=public"

# Servidor
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3001
```

## 🚦 Formato de Respuestas

Todas las respuestas siguen el formato estándar:

### Respuestas Exitosas

```json
{
	"message": "Descripción de la operación",
	"data": {
		/* datos */
	},
	"count": 0 // opcional para listas
}
```

### Respuestas de Error

```json
{
	"statusCode": 404,
	"message": "Descripción del error",
	"error": "Tipo de error",
	"timestamp": "2024-01-15T10:30:00.000Z",
	"path": "/api/endpoint"
}
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
bun run dev              # Iniciar en modo desarrollo
bun run build            # Compilar para producción
bun run start:prod       # Iniciar en modo producción

# Testing
bun run test             # Ejecutar tests unitarios
bun run test:e2e         # Ejecutar tests e2e
bun run test:cov         # Ejecutar tests con coverage

# Calidad de código
bun run lint             # Verificar lint
bun run lint:fix         # Corregir problemas de lint
bun run check-types      # Verificar tipos TypeScript

# Base de datos
bun run prisma:generate  # Generar cliente Prisma
bun run prisma:push      # Pushear esquema a BD
bun run prisma:migrate   # Crear migración
bun run prisma:reset     # Reset completo de BD
bun run prisma:seed      # Poblar con datos de prueba
bun run prisma:studio    # Abrir Prisma Studio
```

## 📊 Estado del Proyecto

- ✅ **Backend completamente funcional**
- ✅ **API RESTful con CRUD completo**
- ✅ **Sistema de health checks**
- ✅ **Manejo robusto de errores**
- ✅ **Respuestas consistentes**
- ✅ **Validaciones completas**
- ✅ **Documentación unificada**
- ✅ **Código limpio y optimizado**
- ✅ **Integración con monorepo**
- ✅ **Docker optimizado**
- ✅ **Base de datos con Prisma**
- ✅ **Datos de prueba incluidos**

## 🎯 Próximos Pasos

1. **Frontend Development** - Implementar interfaces de usuario
2. **API Integration** - Conectar frontend con backend
3. **Testing** - Agregar tests unitarios y e2e
4. **Documentation** - Swagger/OpenAPI docs
5. **Deployment** - Configuración de producción

---

**Desarrollado con NestJS + Prisma + PostgreSQL en monorepo TurboRepo** 🚀

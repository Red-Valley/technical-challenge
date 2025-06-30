# 🏥 Backend - Patient Management System

A robust backend system developed with **NestJS**, **Prisma**, and **PostgreSQL** for comprehensive patient management with hierarchical status tracking and historical monitoring.

> **Part of the Technical Monorepo** - This backend is integrated into a TurboRepo monorepo architecture with a Next.js frontend.

## 📋 Table of Contents

- [🏗️ Architecture Overview](#️-architecture-overview)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Setup and Execution](#-setup-and-execution)
- [🐳 Docker Development](#-docker-development)
- [📚 API Documentation](#-api-documentation)
- [🧪 Health Check System](#-health-check-system)
- [🔧 Common Utilities](#-common-utilities)
- [🛡️ Error Handling](#️-error-handling)
- [🔍 Validation System](#-validation-system)
- [🌐 CORS Configuration](#-cors-configuration)
- [🧪 Test Data](#-test-data)
- [🔗 Monorepo Integration](#-monorepo-integration)
- [📊 Project Status](#-project-status)

## 🏗️ Architecture Overview

### Project Structure

```
src/
├── common/               # Shared utilities and interfaces
│   ├── interfaces/       # Response interfaces and types
│   ├── utils/           # Utility functions
│   ├── filters/         # Global exception filters
│   └── index.ts         # Common exports
├── health/              # Health check system
│   ├── health.controller.ts
│   ├── health.service.ts
│   └── health.module.ts
├── prisma/              # Prisma configuration
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── providers/           # Provider management module
│   ├── dto/
│   ├── providers.controller.ts
│   ├── providers.service.ts
│   └── providers.module.ts
├── patients/            # Patient management module
│   ├── dto/
│   ├── patients.controller.ts
│   ├── patients.service.ts
│   └── patients.module.ts
├── statuses/            # Status management module
│   ├── statuses.controller.ts
│   ├── statuses.service.ts
│   └── statuses.module.ts
├── app.module.ts        # Main application module
└── main.ts             # Application entry point
```

### Core Features

- ✅ **Modular Architecture** with NestJS framework
- ✅ **PostgreSQL Database** with Prisma ORM
- ✅ **Consistent API Responses** with standardized utilities
- ✅ **Global Error Handling** with custom exception filters
- ✅ **Comprehensive Health Checks** for monitoring
- ✅ **Automatic Validation** with DTOs
- ✅ **Status History Tracking** with automatic logging
- ✅ **CORS Configuration** for frontend integration
- ✅ **Monorepo Integration** with TurboRepo
- ✅ **Docker Optimization** with multi-stage builds
- ✅ **TypeScript** with strict type checking
- ✅ **RESTful API** with complete CRUD operations

## 🗄️ Database Schema

### Core Entities

#### 1. **Providers** (Healthcare Providers)

```sql
- id: UUID (Primary Key)
- full_name: string (Provider's full name)
- specialty: string (Medical specialty)
- created_at: datetime (Creation timestamp)
```

#### 2. **Statuses** (Patient Statuses) - Hierarchical Structure

```sql
- id: UUID (Primary Key)
- name: string (Status name, unique)
- parent_id: UUID (Foreign Key to statuses, nullable for root statuses)
- order: integer (Display order)
```

#### 3. **Patients** (Patient Records)

```sql
- id: UUID (Primary Key)
- full_name: string (Patient's full name)
- email: string (Unique email address)
- phone: string (Contact phone number)
- provider_id: UUID (Foreign Key to providers)
- status_id: UUID (Foreign Key to statuses)
- created_at: datetime (Creation timestamp)
```

#### 4. **StatusHistory** (Status Change Tracking)

```sql
- id: UUID (Primary Key)
- patient_id: UUID (Foreign Key to patients)
- status_id: UUID (Foreign Key to statuses)
- changed_at: datetime (Status change timestamp)
```

### 🌳 Predefined Status Hierarchy

```
Scheduled
├── Checked-In
│   ├── In Consultation
│   └── Cancelled
└── No-Show
```

### Database Relationships

- **Provider** → **Patients** (One-to-Many)
- **Status** → **Patients** (One-to-Many)
- **Status** → **Status** (Self-referencing for hierarchy)
- **Patient** → **StatusHistory** (One-to-Many)
- **Status** → **StatusHistory** (One-to-Many)

## 🚀 Setup and Execution

### Option 1: Native Development (Bun)

#### 1. Install Dependencies

```bash
# From monorepo root
bun install

# Or from backend directory
cd apps/backend && bun install
```

#### 2. Environment Configuration

Create a `.env` file in `apps/backend/` with:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/technical_challenge?schema=public"
PORT=3000
NODE_ENV=development
```

#### 3. Database Setup

```bash
# Generate Prisma client
bun run prisma:generate

# Sync schema with database
bun run prisma:push

# Seed with initial data
bun run prisma:seed
```

#### 4. Start Development Server

```bash
# Development mode with hot reload
bun run dev

# Production build and start
bun run build
bun run start:prod
```

### Option 2: Docker Development (Recommended)

#### Using Convenience Scripts

```bash
# Start all services (backend, frontend, database, adminer)
./docker-scripts.sh dev

# Backend only
./docker-scripts.sh dev-backend

# View logs
./docker-scripts.sh logs-backend

# Access backend shell
./docker-scripts.sh shell-backend
```

#### Direct Docker Compose Usage

```bash
# Build and start all services
docker-compose up --build

# Backend only
docker-compose up backend

# Background mode
docker-compose up -d
```

### Available Prisma Commands

```bash
# Generate Prisma client
bun run prisma:generate

# Push schema to database
bun run prisma:push

# Create migration
bun run prisma:migrate

# Reset database
bun run prisma:reset

# Run seed script
bun run prisma:seed

# Open Prisma Studio
bun run prisma:studio
```

## 🐳 Docker Development

### Available Services

- **Backend**: http://localhost:3000 (NestJS API)
- **Frontend**: http://localhost:3001 (Next.js Application)
- **PostgreSQL**: localhost:5432 (Database)
- **Adminer**: http://localhost:8080 (Database management)

### Docker Commands

```bash
# Main management
./docker-scripts.sh dev           # Start complete development environment
./docker-scripts.sh status        # Check service status
./docker-scripts.sh stop          # Stop all services
./docker-scripts.sh restart       # Restart all services
./docker-scripts.sh clean         # Clean up everything

# Logs
./docker-scripts.sh logs          # View all logs
./docker-scripts.sh logs-backend  # Backend logs only
./docker-scripts.sh logs-frontend # Frontend logs only
./docker-scripts.sh logs-db       # Database logs only

# Shell access
./docker-scripts.sh shell-backend  # Backend terminal
./docker-scripts.sh shell-frontend # Frontend terminal
./docker-scripts.sh shell-db       # PostgreSQL terminal

# Database management
./docker-scripts.sh db-reset       # ⚠️ Reset database (destructive)
```

### Docker Features

- ✅ **Hot reload** for development
- ✅ **Multi-stage builds** for optimization
- ✅ **Automatic health checks**
- ✅ **Persistent volumes** for data
- ✅ **Internal networking** configuration
- ✅ **Environment variable** management

## 📚 API Documentation

All routes are prefixed with `/api`. Example: `http://localhost:3000/api/patients`

### 🔍 Providers (`/api/providers`)

| Method | Endpoint                   | Description             |
| ------ | -------------------------- | ----------------------- |
| GET    | `/api/providers`           | List all providers      |
| GET    | `/api/providers/:id`       | Get specific provider   |
| GET    | `/api/providers/:id/stats` | Get provider statistics |
| POST   | `/api/providers`           | Create new provider     |

#### Example POST `/api/providers`:

```json
{
	"full_name": "Dr. John Smith",
	"specialty": "Cardiology"
}
```

#### Response Format:

```json
{
	"message": "Provider created successfully",
	"data": {
		"id": "uuid",
		"full_name": "Dr. John Smith",
		"specialty": "Cardiology",
		"created_at": "2024-01-15T10:30:00.000Z"
	}
}
```

### 👥 Patients (`/api/patients`)

| Method | Endpoint                           | Description                 |
| ------ | ---------------------------------- | --------------------------- |
| GET    | `/api/patients`                    | List all patients           |
| GET    | `/api/patients?provider=:id`       | Filter patients by provider |
| GET    | `/api/patients?status=:id`         | Filter patients by status   |
| GET    | `/api/patients/:id`                | Get specific patient        |
| GET    | `/api/patients/:id/status-history` | Get patient status history  |
| POST   | `/api/patients`                    | Create new patient          |
| PATCH  | `/api/patients/:id/status`         | Update patient status       |

#### Example POST `/api/patients`:

```json
{
	"full_name": "Jane Doe",
	"email": "jane.doe@email.com",
	"phone": "+1 555 123 4567",
	"provider_id": "provider-uuid",
	"status_id": "status-uuid"
}
```

#### Example PATCH `/api/patients/:id/status`:

```json
{
	"status_id": "new-status-uuid"
}
```

### 📊 Statuses (`/api/statuses`)

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/api/statuses`                 | List all statuses         |
| GET    | `/api/statuses/hierarchy`       | Get status hierarchy      |
| GET    | `/api/statuses/stats`           | Get status statistics     |
| GET    | `/api/statuses/:id`             | Get specific status       |
| GET    | `/api/statuses/:id/path`        | Get complete status path  |
| GET    | `/api/statuses/:id/children`    | Get child statuses        |
| GET    | `/api/statuses/:id/transitions` | Get available transitions |

### Query Parameters

#### Patient Filtering

```bash
# Filter by provider
GET /api/patients?provider=uuid

# Filter by status
GET /api/patients?status=uuid

# Combine filters (if supported)
GET /api/patients?provider=uuid&status=uuid
```

## 🧪 Health Check System

Comprehensive monitoring system that verifies application health and dependencies.

### Available Endpoints

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/health`          | Complete health check        |
| GET    | `/api/health/ready`    | Readiness check (Kubernetes) |
| GET    | `/api/health/live`     | Liveness check (Kubernetes)  |
| GET    | `/api/health/simple`   | Simple status check          |
| GET    | `/api/health/database` | Database connection check    |

### Complete Health Check - `GET /api/health`

Provides comprehensive system status:

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

**Possible Status Values:**

- `healthy`: All systems operational
- `degraded`: Operational with warnings (e.g., high memory usage)
- `unhealthy`: System not healthy (e.g., database disconnected)

### Kubernetes Configuration

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

## 🔧 Common Utilities

Standardized utility system for consistent responses and error handling.

### Response Interfaces

#### `ApiResponse<T>`

Standard interface for all successful responses:

```typescript
interface ApiResponse<T = any> {
	message: string
	data: T
	count?: number
}
```

#### `ApiErrorResponse`

Interface for formatted error responses:

```typescript
interface ApiErrorResponse {
	statusCode: number
	message: string | string[]
	error: string
	timestamp: string
	path: string
}
```

### Response Utility Functions

#### Basic Functions

```typescript
// Basic success response
createSuccessResponse<T>(message: string, data: T, count?: number): ApiResponse<T>

// Single data response
createDataResponse<T>(message: string, data: T): ApiResponse<T>
```

#### Operation-Specific Functions

```typescript
// For created resources (POST)
createCreatedResponse<T>(resourceName: string, data: T): ApiResponse<T>

// For updated resources (PUT/PATCH)
createUpdatedResponse<T>(resourceName: string, data: T): ApiResponse<T>

// For retrieved single resource (GET /:id)
createRetrievedResponse<T>(resourceName: string, data: T): ApiResponse<T>

// For multiple resources (GET)
createRetrievedListResponse<T>(resourceName: string, data: T[]): ApiResponse<T[]>
```

#### Usage Example

**Before:**

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

**After:**

```typescript
import { ApiResponse, createRetrievedListResponse } from '../common'

@Get()
async findAll(): Promise<ApiResponse> {
  const patients = await this.patientsService.findAll()
  return createRetrievedListResponse('Patients', patients)
}
```

## 🛡️ Error Handling

The `GlobalExceptionFilter` automatically captures and formats all errors:

### Handled Error Types

1. **NestJS HTTP Exceptions**: `NotFoundException`, `ConflictException`, etc.
2. **Prisma Errors**: Specific database error codes
3. **Validation Errors**: From ValidationPipe
4. **Unexpected Errors**: Internal server errors

### Prisma Error Codes

- `P2002`: Unique constraint violation → `409 Conflict`
- `P2025`: Record not found → `404 Not Found`
- `P2003`: Foreign key constraint violation → `400 Bad Request`
- `P2014`: Required relation violation → `400 Bad Request`

### Formatted Error Example

```json
{
	"statusCode": 404,
	"message": "Patient with ID 123 not found",
	"error": "Not Found",
	"timestamp": "2024-01-15T10:30:00.000Z",
	"path": "/api/patients/123"
}
```

### Configuration

The filter is globally configured in `main.ts`:

```typescript
app.useGlobalFilters(new GlobalExceptionFilter())
```

## 🔍 Validation System

### Implemented Validations

- ✅ **DTO Validation** with `class-validator`
- ✅ **Automatic Data Transformation**
- ✅ **Relationship Validation** (provider and status existence)
- ✅ **Unique Email Validation** for patients
- ✅ **Status Transition Validation**
- ✅ **Automatic Status History** tracking

### Global Configuration

```typescript
app.useGlobalPipes(
	new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true
	})
)
```

### DTO Examples

#### Create Patient DTO

```typescript
export class CreatePatientDto {
	@IsString()
	@IsNotEmpty()
	full_name: string

	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	phone: string

	@IsUUID()
	provider_id: string

	@IsUUID()
	status_id: string
}
```

#### Update Status DTO

```typescript
export class UpdatePatientStatusDto {
	@IsUUID()
	status_id: string
}
```

## 🌐 CORS Configuration

CORS configured to allow connections from the frontend:

```typescript
app.enableCors({
	origin: ['http://localhost:3001', 'http://frontend:3001'],
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	credentials: true
})
```

## 🧪 Test Data

The seed script includes:

- **4 Providers** with different specialties:
  - Dr. María García López (Cardiology)
  - Dr. Juan Carlos Mendoza (General Medicine)
  - Dra. Ana Isabel Rodríguez (Pediatrics)
  - Dr. Carlos Alberto Vega (Dermatology)

- **5 Statuses** with complete hierarchy:
  - Scheduled → Checked-In → In Consultation
  - Scheduled → Checked-In → Cancelled
  - Scheduled → No-Show

- **4 Sample Patients** with different statuses
- **Status History** to demonstrate functionality

### Run Seed

```bash
bun run prisma:seed
```

## 🔗 Monorepo Integration

### Monorepo Scripts

```bash
# From project root
bun dev:backend          # Run backend only
bun dev                  # Run backend + frontend
bun build:backend        # Build backend
bun lint:backend         # Lint backend
bun test:backend         # Test backend
```

### Monorepo Structure

```
technical-challenge/
├── apps/
│   ├── backend/         # This project
│   └── frontend/        # Next.js application
├── packages/
│   ├── eslint-config/   # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── docker-compose.yml   # Service orchestration
└── docker-scripts.sh    # Convenience scripts
```

### Shared Environment Variables

The backend uses environment variables that can be configured at the monorepo level:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/technical_challenge?schema=public"

# Server
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3001
```

## 📊 Response Format Standards

All responses follow the standard format:

### Successful Responses

```json
{
	"message": "Operation description",
	"data": {
		/* response data */
	},
	"count": 0 // optional for lists
}
```

### Error Responses

```json
{
	"statusCode": 404,
	"message": "Error description",
	"error": "Error type",
	"timestamp": "2024-01-15T10:30:00.000Z",
	"path": "/api/endpoint"
}
```

## 🔧 Available Scripts

```bash
# Development
bun run dev              # Start development mode
bun run build            # Build for production
bun run start:prod       # Start production mode

# Testing
bun run test             # Run unit tests
bun run test:e2e         # Run end-to-end tests
bun run test:cov         # Run tests with coverage

# Code Quality
bun run lint             # Check linting
bun run lint:fix         # Fix linting issues
bun run check-types      # Check TypeScript types

# Database
bun run prisma:generate  # Generate Prisma client
bun run prisma:push      # Push schema to database
bun run prisma:migrate   # Create migration
bun run prisma:reset     # Reset database completely
bun run prisma:seed      # Seed with test data
bun run prisma:studio    # Open Prisma Studio
```

## 📊 Project Status

- ✅ **Fully Functional Backend**
- ✅ **Complete RESTful API with CRUD operations**
- ✅ **Comprehensive Health Check System**
- ✅ **Robust Error Handling**
- ✅ **Consistent Response Formatting**
- ✅ **Complete Validation System**
- ✅ **Unified Documentation**
- ✅ **Clean and Optimized Code**
- ✅ **Monorepo Integration**
- ✅ **Docker Optimization**
- ✅ **Prisma Database Integration**
- ✅ **Included Test Data**

## 🎯 Next Steps

1. **Frontend Development** - Implement user interfaces
2. **API Integration** - Connect frontend with backend
3. **Testing** - Add unit and e2e tests
4. **Documentation** - Swagger/OpenAPI documentation
5. **Deployment** - Production configuration
6. **Performance Optimization** - Caching and optimization
7. **Security** - Authentication and authorization
8. **Monitoring** - Logging and metrics

## 🛠️ Technology Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.8
- **Database**: PostgreSQL with Prisma ORM
- **Runtime**: Bun 1.x
- **Containerization**: Docker with multi-stage builds
- **Monorepo**: TurboRepo
- **Validation**: class-validator & class-transformer
- **Testing**: Jest
- **Linting**: ESLint with shared config

---

**Developed with NestJS + Prisma + PostgreSQL in TurboRepo Monorepo** 🚀

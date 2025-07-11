# Medwork Backend

A NestJS backend application for managing patients, providers, and clinical statuses with hierarchical relationships.

## Features

- **Patient Management**: Create and view patients
- **Provider Management**: Create and view healthcare providers
- **Status Management**: Hierarchical clinical status system
- **Status History**: Track patient status changes over time
- **API Documentation**: Swagger/OpenAPI documentation

## Database Schema

### Tables

1. **patients**
   - id (UUID, Primary Key)
   - full_name (string)
   - email (string)
   - phone (string)
   - provider_id (UUID, Foreign Key)
   - status_id (UUID, Foreign Key)
   - created_at (datetime)

2. **providers**
   - id (UUID, Primary Key)
   - full_name (string)
   - specialty (string)
   - created_at (datetime)

3. **statuses**
   - id (UUID, Primary Key)
   - name (string)
   - parent_id (UUID, nullable, Foreign Key to statuses)
   - order (integer)

4. **status_history**
   - id (UUID, Primary Key)
   - patient_id (UUID, Foreign Key)
   - status_id (UUID, Foreign Key)
   - changed_at (datetime)

### Preloaded Status Hierarchy

```
Scheduled
├── Checked-In
│   ├── In Consultation
│   └── Cancelled
└── No-Show
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Docker and Docker Compose (optional)

## Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database configuration
```

3. Start PostgreSQL database:

**Option A: Using Docker Compose**
```bash
docker-compose up -d postgres
```

**Option B: Using local PostgreSQL**
Make sure PostgreSQL is running and update the .env file with your database credentials.

## Running the Application

### Development Mode

1. Start the application:
```bash
npm run start:dev
```

2. Seed the database with initial statuses:
```bash
npm run seed
```

The application will be available at:
- API: http://localhost:3000
- Swagger Documentation: http://localhost:3000/api

### Production Mode with Docker

```bash
docker-compose up --build
```

## API Endpoints

### Patients
- `POST /patients` - Create a new patient
- `GET /patients` - Get all patients
- `GET /patients/:id` - Get a patient by ID
- `PATCH /patients/:id/status` - Change patient status
- `GET /patients/:id/status-history` - Get patient status history

### Providers
- `POST /providers` - Create a new provider
- `GET /providers` - Get all providers
- `GET /providers/:id` - Get a provider by ID

### Statuses
- `GET /statuses` - Get all statuses
- `GET /statuses/hierarchy` - Get statuses in hierarchical structure
- `POST /statuses/seed` - Seed initial statuses

## Example Usage

### 1. Create a Provider
```bash
curl -X POST http://localhost:3000/providers \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Dr. John Smith",
    "specialty": "Cardiology"
  }'
```

### 2. Get Status Hierarchy
```bash
curl http://localhost:3000/statuses/hierarchy
```

### 3. Create a Patient
```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "+1234567890",
    "providerId": "provider-uuid-here",
    "statusId": "status-uuid-here"
  }'
```

### 4. Change Patient Status
```bash
curl -X PATCH http://localhost:3000/patients/patient-uuid-here/status \
  -H "Content-Type: application/json" \
  -d '{
    "statusId": "new-status-uuid-here"
  }'
```

## Database Migrations

```bash
# Create a new migration
npm run migration:create -- src/database/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── entities/           # TypeORM entities
├── modules/           # Feature modules
│   ├── patients/      # Patient management
│   ├── providers/     # Provider management
│   └── statuses/      # Status management
├── dto/               # Data Transfer Objects
├── database/          # Database configuration and seeds
├── app.module.ts      # Main application module
└── main.ts           # Application entry point
```

## Technologies Used

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

## License

MIT

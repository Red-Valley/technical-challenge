# 🏥 Medical Management System - Medwork

A full-stack application for managing patients, medical providers, and clinical status tracking.

## 🚀 Features

- ✅ **Patient Management**: Create, edit, delete, and list patients
- ✅ **Provider Management**: Manage doctors and specialties
- ✅ **Clinical Statuses**: Hierarchical status system with parent-child relationships
- ✅ **Status History**: Complete timeline of status changes per patient
- ✅ **Dashboard**: Overview with statistics and quick actions
- ✅ **Modern Interface**: Responsive UI with TailwindCSS

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd technical-challenge
```

### 2. Set up the database
```bash
# Create PostgreSQL database
createdb medwork_db
```

### 3. Configure environment variables
```bash
# Backend (.env)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_NAME=medwork_db
NODE_ENV=development
PORT=3000
```

### 4. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 5. Run seeds
```bash
cd backend
node simple-seed.js
```

> **Note**: The seed script will create the database tables and insert sample data. If you encounter any errors, make sure your database connection is working and the database exists.

### 6. Start the application
```bash
# From the project root
npm run dev
```

## 🌐 Access the application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 📊 Database Schema

### Tables

#### `patients`
- `id` (UUID, PK)
- `full_name` (string)
- `email` (string)
- `phone` (string)
- `provider_id` (UUID, FK to providers)
- `status_id` (UUID, FK to statuses)
- `created_at` (timestamp)

#### `providers`
- `id` (UUID, PK)
- `full_name` (string)
- `specialty` (string)
- `created_at` (timestamp)

#### `statuses`
- `id` (UUID, PK)
- `name` (string)
- `parent_id` (UUID, FK to statuses, nullable)
- `order` (integer)

#### `status_history`
- `id` (UUID, PK)
- `patient_id` (UUID, FK to patients)
- `status_id` (UUID, FK to statuses)
- `changed_at` (timestamp)

### Preloaded Statuses
```
Scheduled
├── Checked-In
│   ├── In Consultation
│   └── Cancelled
└── No-Show
```

## 🏗️ Architecture

### Backend (NestJS)
```
src/
├── config/           # Database configuration
├── entities/         # TypeORM entities
├── modules/          # Application modules
│   ├── patients/     # Patient management
│   ├── providers/    # Provider management
│   └── statuses/     # Status management
└── main.ts          # Entry point
```

### Frontend (React)
```
src/
├── components/       # Reusable components
├── hooks/           # Custom API hooks
├── pages/           # Application pages
├── services/        # API services
├── types/           # TypeScript types
└── main.tsx         # Entry point
```

## �� Main Features

### Patient Management
- Create new patients with complete information
- Assign medical providers
- Change clinical status with automatic history
- Filter by status
- View complete change history

### Provider Management
- Register doctors with specialties
- List and edit information
- Assign to patients

### Clinical Statuses
- Parent-child hierarchical system
- Customizable order
- Automatic change history

## 🔄 API Endpoints

### Patients
- `GET /patients` - List patients
- `POST /patients` - Create patient
- `GET /patients/:id` - Get patient
- `PATCH /patients/:id` - Update patient
- `PATCH /patients/:id/status` - Change status
- `GET /patients/:id/status-history` - Status history
- `DELETE /patients/:id` - Delete patient

### Providers
- `GET /providers` - List providers
- `POST /providers` - Create provider
- `GET /providers/:id` - Get provider
- `PATCH /providers/:id` - Update provider
- `DELETE /providers/:id` - Delete provider

### Statuses
- `GET /statuses` - List statuses
- `POST /statuses` - Create status
- `GET /statuses/:id` - Get status
- `PATCH /statuses/:id` - Update status
- `DELETE /statuses/:id` - Delete status

## 🔧 Troubleshooting

### Database Connection Issues
- **Error**: `ECONNREFUSED` - Make sure PostgreSQL is running
- **Error**: `password authentication failed` - Check your DB_PASSWORD in .env
- **Error**: `database "medwork_db" does not exist` - Create the database first

### Seed Script Issues
- **Error**: `relation "statuses" does not exist` - Run the seed script again
- **Error**: `duplicate key value violates unique constraint` - The script handles this automatically

### Frontend Issues
- **Error**: `Cannot connect to backend` - Make sure the backend is running on port 3000
- **Error**: `CORS error` - Check FRONTEND_URL in backend .env file

### Common Commands
```bash
# Test database connection
cd backend
node -e "require('dotenv').config(); console.log('DB Config:', process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME)"

# Reset database (WARNING: This will delete all data)
psql -U postgres -d medwork_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
node simple-seed.js
```

## 👨‍💻 Author

Developed by Jhonatan Becerra as part of the technical challenge for the Medwork system.

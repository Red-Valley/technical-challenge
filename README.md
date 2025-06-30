# 🏥 Patient Management System - Monorepo

A comprehensive patient management system developed as a **monorepo** using **Turborepo**. The system includes a robust backend with NestJS and PostgreSQL, and a modern frontend with Next.js and React.

## 📋 Table of Contents

- [🏗️ Project Architecture](#️-project-architecture)
- [📁 Monorepo Structure](#-monorepo-structure)
- [🚀 Quick Start](#-quick-start)
- [📚 Complete Documentation](#-complete-documentation)
- [🔗 Quick Links](#-quick-links)
- [🛠️ Development Guide](#️-development-guide)
- [🐳 Docker Guide](#-docker-guide)
- [🔧 Configuration](#-configuration)
- [📊 API Documentation](#-api-documentation)
- [🎯 Features](#-features)

## 🏗️ Project Architecture

### Technology Stack

**Backend:**

- **NestJS** - Node.js framework for scalable applications
- **Prisma** - Modern ORM for TypeScript and Node.js
- **PostgreSQL** - Robust relational database
- **TypeScript** - Complete static typing

**Frontend:**

- **Next.js 15** - React framework with App Router
- **React 19** - Modern UI library
- **TypeScript** - Static typing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Formik + Yup** - Form handling and validation

**Infrastructure:**

- **Turborepo** - Build system and caching for monorepos
- **Docker** - Complete containerization
- **Bun** - Ultra-fast runtime and package manager

### System Features

✅ **Complete patient management** with hierarchical states  
✅ **Automatic history** of state changes  
✅ **Responsive interface** with table and card modes  
✅ **Robust validation** in frontend and backend  
✅ **RESTful API** with complete documentation  
✅ **Optimized database** with complex relationships  
✅ **Complete dockerization** for development and production  
✅ **Optimized monorepo** with intelligent caching

## 📁 Monorepo Structure

```
technical-challenge/
├── apps/                          # Main applications
│   ├── backend/                   # NestJS API
│   │   ├── src/                   # Source code
│   │   ├── prisma/                # Schema and migrations
│   │   ├── Dockerfile             # Backend container
│   │   └── README.md              # Specific documentation
│   └── frontend/                  # Next.js application
│       ├── src/                   # Source code
│       ├── public/                # Static assets
│       ├── Dockerfile             # Frontend container
│       └── README.md              # Specific documentation
├── packages/                      # Shared packages
│   ├── eslint-config/             # ESLint configuration
│   └── typescript-config/         # TypeScript configuration
├── docs/                          # Complete documentation
├── init-db/                       # Database initialization scripts
├── docker-compose.yml             # Service orchestration
├── docker-scripts.sh              # Convenience scripts
├── turbo.json                     # Turborepo configuration
├── package.json                   # Root dependencies
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Docker** and **Docker Compose** (recommended)
- **Node.js 18+** or **Bun 1+** (for local development)
- **Git**

### Option 1: Docker (Recommended - Easiest)

1. **Clone the repository**

```bash
git clone <repository-url>
cd technical-challenge
```

2. **Set up environment variables**

```bash
cp env.template .env
# Edit .env if necessary (default values work)
```

3. **Run the entire stack**

```bash
# Using convenience scripts
./docker-scripts.sh dev

# Or using npm/yarn
npm run docker:dev
```

4. **Access the applications**

- 🌐 **Frontend**: http://localhost:3001
- 🔧 **Backend API**: http://localhost:3000
- 🗄️ **Adminer (DB)**: http://localhost:8080

### Option 2: Local Development

1. **Install dependencies**

```bash
bun install
```

2. **Set up database**

```bash
# Start only PostgreSQL
docker-compose up postgres -d

# Configure backend
cd apps/backend
bun run prisma:generate
bun run prisma:push
bun run prisma:seed
```

3. **Run applications**

```bash
# Terminal 1 - Backend
bun run dev:backend

# Terminal 2 - Frontend
bun run dev:frontend
```

## 📚 Complete Documentation

📖 **Complete documentation in English**: [`docs/README.md`](./docs/README.md)

The complete documentation includes:

- Detailed installation and configuration guide
- API documentation
- Development and debugging guides
- Troubleshooting and problem solving
- Deployment references
- And much more...

## 🔗 Quick Links

### Specific Documentation

- 📖 **Backend**: [`apps/backend/README.md`](./apps/backend/README.md)
  - Complete API documentation with all endpoints
  - Database schema and relationships
  - Setup instructions for local and Docker development
  - Health check system and monitoring
  - Error handling and validation patterns
  - Prisma ORM configuration and migrations

- 📖 **Frontend**: [`apps/frontend/README.md`](./apps/frontend/README.md)
  - Component architecture and structure
  - State management with Context API
  - Form handling with Formik and Yup
  - API integration and error handling
  - Responsive design implementation
  - Custom hooks and utilities

- 📖 **Complete Documentation**: [`docs/README.md`](./docs/README.md)
  - Detailed installation and configuration guide
  - Development and debugging guides
  - Troubleshooting and problem solving
  - Deployment references and best practices

### Main Scripts

```bash
# Development
bun run dev                    # Entire monorepo
bun run dev:frontend          # Frontend only
bun run dev:backend           # Backend only

# Docker
./docker-scripts.sh dev       # Complete development
./docker-scripts.sh logs      # View logs
./docker-scripts.sh stop      # Stop services

# Build
bun run build                 # Complete build
bun run lint                  # Lint everything
bun run format                # Format code
```

### Access URLs

- 🌐 **Frontend**: http://localhost:3001
- 🔧 **Backend API**: http://localhost:3000
- 🗄️ **Adminer (DB)**: http://localhost:8080
- 🔍 **Health Check**: http://localhost:3000/health

## 🛠️ Development Guide

### Prerequisites for Development

- **Node.js 18+** or **Bun 1+**
- **Docker** and **Docker Compose**
- **Git**

### Setting Up Development Environment

1. **Clone and install dependencies**

```bash
git clone <repository-url>
cd technical-challenge
bun install
```

2. **Environment configuration**

```bash
cp env.template .env
# Configure your environment variables
```

3. **Database setup**

```bash
# Start PostgreSQL
docker-compose up postgres -d

# Initialize database
cd apps/backend
bun run prisma:generate
bun run prisma:push
bun run prisma:seed
```

### Development Workflow

1. **Start development servers**

```bash
# Start both frontend and backend
bun run dev

# Or start individually
bun run dev:backend
bun run dev:frontend
```

2. **Code quality checks**

```bash
bun run lint          # Run linter
bun run format        # Format code
bun run check-types   # Type checking
```

3. **Database operations**

```bash
cd apps/backend
bun run prisma:studio    # Open Prisma Studio
bun run prisma:generate  # Generate Prisma client
bun run prisma:migrate   # Run migrations
```

## 🐳 Docker Guide

### Docker Services

The project includes the following Docker services:

- **postgres**: PostgreSQL database
- **backend**: NestJS API server
- **frontend**: Next.js application
- **adminer**: Database management interface

### Docker Commands

```bash
# Development environment
./docker-scripts.sh dev

# Build images
./docker-scripts.sh build

# View logs
./docker-scripts.sh logs

# Stop services
./docker-scripts.sh stop

# Clean up
./docker-scripts.sh clean

# Check status
./docker-scripts.sh status
```

### Docker Compose Configuration

The `docker-compose.yml` file includes:

- **Automatic database initialization**
- **Hot reload for development**
- **Health checks**
- **Volume mounts for development**
- **Network isolation**

## 🔧 Configuration

### Environment Variables

Key environment variables (see `env.template`):

```bash
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=technical_challenge
DB_USER=postgres
DB_PASSWORD=postgres

# Backend Configuration
API_PORT=3000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development

# Frontend Configuration
FRONTEND_PORT=3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Adminer Configuration
ADMINER_PORT=8080
```

### Turborepo Configuration

The `turbo.json` file configures:

- **Build dependencies**
- **Caching strategies**
- **Development tasks**
- **Output directories**

## 📊 API Documentation

### Backend API

The backend provides a RESTful API with the following endpoints:

- **GET /health** - Health check
- **GET /patients** - List patients
- **POST /patients** - Create patient
- **GET /patients/:id** - Get patient details
- **PUT /patients/:id** - Update patient
- **DELETE /patients/:id** - Delete patient
- **GET /patients/:id/history** - Get patient history

### API Base URL

- **Development**: http://localhost:3000
- **Production**: Configure via environment variables

### Authentication

The API uses JWT authentication for protected endpoints.

## 🎯 Features

### Patient Management

- **Complete CRUD operations** for patients
- **State management** with hierarchical states
- **Automatic history tracking** of all changes
- **Validation** at both frontend and backend levels

### User Interface

- **Responsive design** that works on all devices
- **Table and card views** for different preferences
- **Real-time updates** using WebSocket connections
- **Modern UI** with Tailwind CSS

### Database

- **PostgreSQL** with optimized schema
- **Prisma ORM** for type-safe database operations
- **Migrations** for schema versioning
- **Seeding** for initial data

### Development Experience

- **Hot reload** for both frontend and backend
- **TypeScript** for type safety
- **ESLint and Prettier** for code quality
- **Husky** for pre-commit hooks

### Deployment

- **Docker containers** for easy deployment
- **Environment-specific configurations**
- **Health checks** for monitoring
- **Logging** for debugging

## 📖 Detailed Documentation

For comprehensive information about each component, please refer to the specific documentation:

### 🏥 Backend Documentation

**📖 [`apps/backend/README.md`](./apps/backend/README.md)**

The backend documentation covers:

- **Complete API Reference** - All endpoints with request/response examples
- **Database Architecture** - Schema design, relationships, and migrations
- **Development Setup** - Local and Docker development instructions
- **Health Monitoring** - Health check system and monitoring tools
- **Error Handling** - Global exception filters and validation patterns
- **Prisma Configuration** - ORM setup, migrations, and seeding

### 🎨 Frontend Documentation

**📖 [`apps/frontend/README.md`](./apps/frontend/README.md)**

The frontend documentation includes:

- **Component Architecture** - Detailed component structure and organization
- **State Management** - Context API implementation and patterns
- **Form Handling** - Formik and Yup validation strategies
- **API Integration** - Axios configuration and error handling
- **Responsive Design** - Mobile-first design implementation
- **Custom Hooks** - Reusable logic and utilities

### 📚 Complete Project Documentation

**📖 [`docs/README.md`](./docs/README.md)**

The complete documentation provides:

- **Installation Guide** - Step-by-step setup instructions
- **Development Workflow** - Best practices and development patterns
- **Troubleshooting** - Common issues and solutions
- **Deployment Guide** - Production deployment strategies
- **Architecture Decisions** - Technical decisions and rationale

---

**🚀 Ready to get started? Choose your path:**

- **Quick Start**: Follow the [Quick Start](#-quick-start) section above
- **Backend Development**: Check the [Backend Documentation](./apps/backend/README.md)
- **Frontend Development**: Explore the [Frontend Documentation](./apps/frontend/README.md)
- **Complete Guide**: Read the [Complete Documentation](./docs/README.md)

**For detailed information, check the [complete documentation](./docs/README.md)! 🏥✨**

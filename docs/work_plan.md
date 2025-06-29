# 📋 Plan de Trabajo - Sistema de Gestión de Pacientes

## 🎯 Objetivo
Desarrollar una aplicación full-stack para gestionar pacientes, proveedores y estados clínicos con jerarquía padre-hijo usando **arquitectura de monorepo con Docker**.

## ⏰ Tiempo Estimado: 8 horas

---

## 📁 Estructura del Monorepo ✅ **MODIFICADA - USANDO TURBOREPO**
```
technical-challenge/
├── apps/                 # Aplicaciones (CAMBIO: se usa TurboRepo)
│   ├── backend/         # API NestJS ✅ IMPLEMENTADO
│   │   ├── src/         # Código fuente ✅
│   │   ├── .eslintrc.js # ESLint config backend ✅
│   │   └── .prettierrc  # Prettier config backend ✅
│   └── frontend/        # Next.js App ✅ IMPLEMENTADO
│       ├── src/         # Código fuente ✅
│       ├── .eslintrc.js # ESLint config frontend ✅
│       └── .prettierrc  # Prettier config frontend ✅
├── packages/            # Paquetes compartidos ✅ IMPLEMENTADO
│   ├── eslint-config/   # Config ESLint compartida ✅
│   └── typescript-config/ # Config TS compartida ✅
├── docker-compose.yml   # Orquestación de servicios ❌ NO IMPLEMENTADO
├── .env.example         # Variables de entorno ❌ NO IMPLEMENTADO
├── .prettierrc          # Prettier config global ✅ IMPLEMENTADO
├── .editorconfig        # EditorConfig ❌ NO IMPLEMENTADO
├── .husky/              # Git hooks ❌ NO IMPLEMENTADO
├── turbo.json           # Configuración TurboRepo ✅ IMPLEMENTADO
├── package.json         # Scripts del monorepo ✅ IMPLEMENTADO
└── README.md            # Instrucciones de setup ✅ IMPLEMENTADO (básico)
```

---

## 📌 Fase 1: Configuración Inicial del Monorepo ✅ **COMPLETADA PARCIALMENTE**

### 1.1 Estructura del Monorepo
- [x] Crear estructura de carpetas del monorepo ✅ **USANDO TURBOREPO**
- [x] Configurar `.gitignore` global ✅
- [ ] Configurar variables de entorno compartidas ❌
- [x] **Configurar Linters Root** ✅ **IMPLEMENTADO**:
  - [x] Configuración global de Prettier ✅
  - [ ] EditorConfig para consistencia de editor ❌
  - [x] Scripts de linting a nivel monorepo ✅
  - [ ] Lint-staged para optimizar pre-commit ❌

### 1.2 Configuración de Docker ❌ **NO IMPLEMENTADO**
- [ ] **Dockerfile** para backend (NestJS) ❌
- [ ] **Dockerfile** para frontend (Next.js) ❌ **CAMBIO: Next.js en lugar de React+Vite**
- [ ] **docker-compose.yml** con servicios ❌:
  - `postgres` (base de datos)
  - `backend` (API NestJS)
  - `frontend` (Next.js app)
  - `adminer` (opcional, para gestión de BD)
- [ ] Scripts de desarrollo y producción ❌

### 1.3 Configuración del Backend ✅ **IMPLEMENTADO BÁSICO**
- [x] Inicializar proyecto NestJS en `/apps/backend` ✅
- [x] Configurar estructura de carpetas básica ✅
- [ ] Instalar dependencias necesarias ❌:
  - `@nestjs/typeorm`, `typeorm`, `pg` (PostgreSQL)
  - `@nestjs/swagger` (documentación API)
  - `class-validator`, `class-transformer`
  - `uuid`
- [ ] Configurar conexión a PostgreSQL con variables de entorno ❌
- [x] **Configurar Linters Backend** ✅ **IMPLEMENTADO**:
  - [x] ESLint con configuración NestJS ✅
  - [x] Prettier para formateo de código ✅
  - [ ] Husky para pre-commit hooks ❌
  - [x] Scripts: `lint`, `lint:fix`, `format` ✅

### 1.4 Configuración del Frontend ✅ **IMPLEMENTADO CON NEXT.JS**
- [x] Crear proyecto Next.js en `/apps/frontend` ✅ **CAMBIO: Next.js en lugar de React+Vite**
- [x] Configurar TailwindCSS ✅
- [ ] Instalar dependencias necesarias ❌:
  - `@reduxjs/toolkit`, `react-redux` (estado global)
  - `@tanstack/react-query` (data fetching)
  - `react-router-dom` (navegación) - **NO NECESARIO CON NEXT.JS**
  - `axios` (HTTP client)
- [ ] Configurar proxy/variables para comunicación con backend ❌
- [x] **Configurar Linters Frontend** ✅ **IMPLEMENTADO**:
  - [x] ESLint con configuración Next.js + TypeScript ✅
  - [x] Prettier para formateo de código ✅
  - [x] Configuración Tailwind ✅
  - [x] Scripts: `lint`, `lint:fix`, `format`, `type-check` ✅

### 1.5 Shared Module ✅ **IMPLEMENTADO PARCIALMENTE**
- [x] Crear packages compartidos para configuraciones ✅
- [ ] Interfaces para DTOs y entidades ❌

---

## 📌 Fase 2: Modelado de Datos y Migraciones ❌ **NO IMPLEMENTADO**

### 2.1 Entidades TypeORM
- [ ] **Entity `Provider`**: id, full_name, specialty, created_at ❌
- [ ] **Entity `Status`**: id, name, parent_id, order ❌
- [ ] **Entity `Patient`**: id, full_name, email, phone, provider_id, status_id, created_at ❌
- [ ] **Entity `StatusHistory`**: id, patient_id, status_id, changed_at ❌

### 2.2 Relaciones
- [ ] Patient ↔ Provider (ManyToOne) ❌
- [ ] Patient ↔ Status (ManyToOne) ❌
- [ ] Status ↔ Status (self-referencing) ❌
- [ ] StatusHistory ↔ Patient (ManyToOne) ❌
- [ ] StatusHistory ↔ Status (ManyToOne) ❌

### 2.3 Seed Data y Migraciones
- [ ] Configurar migraciones de TypeORM ❌
- [ ] Script de seed para estados jerárquicos ❌:
  ```
  Scheduled
  ├── Checked-In
  │   ├── In Consultation
  │   └── Cancelled
  └── No-Show
  ```
- [ ] Datos de ejemplo para proveedores ❌
- [ ] Ejecutar seeds al inicializar con Docker ❌

---

## 📌 Fase 3: Backend - APIs REST ❌ **NO IMPLEMENTADO**

### 3.1 Módulo Providers
- [ ] `ProvidersController` ❌:
  - `POST /providers` - Crear proveedor
  - `GET /providers` - Listar proveedores
- [ ] `ProvidersService` con lógica de negocio ❌
- [ ] DTOs: `CreateProviderDto` ❌

### 3.2 Módulo Patients
- [ ] `PatientsController` ❌:
  - `POST /patients` - Crear paciente
  - `GET /patients` - Listar pacientes con provider y status
  - `PATCH /patients/:id/status` - Cambiar estado
  - `GET /patients/:id/status-history` - Historial de estados
- [ ] `PatientsService` con lógica de negocio ❌
- [ ] DTOs: `CreatePatientDto`, `UpdatePatientStatusDto` ❌

### 3.3 Módulo Statuses
- [ ] `StatusesController` ❌:
  - `GET /statuses` - Obtener jerarquía de estados
- [ ] `StatusesService` ❌
- [ ] Lógica para manejar jerarquía padre-hijo ❌

### 3.4 Validaciones y Manejo de Errores
- [ ] Validación de DTOs con class-validator ❌
- [ ] Filtros de excepción globales ❌
- [ ] CORS configurado para frontend ❌

---

## 📌 Fase 4: Frontend - Interfaces de Usuario ❌ **NO IMPLEMENTADO**

### 4.1 Configuración de Estado Global
- [ ] Store Redux con slices para ❌:
  - `patientsSlice`
  - `providersSlice`
  - `statusesSlice`
- [ ] Configuración de React Query ❌
- [ ] Configuración de axios con baseURL del backend ❌

### 4.2 Componentes Base ✅ **IMPLEMENTADO PARCIALMENTE**
- [x] Layout principal con navegación ✅
- [x] Componentes reutilizables básicos ✅ **Header, FeatureCard**
- [ ] Componentes de formulario: Input, Button, Select, Modal ❌
- [ ] Componente StatusHierarchy (dropdown con jerarquía) ❌

### 4.3 Pantallas Requeridas ❌ **NO IMPLEMENTADO**
- [ ] **Formulario de Creación de Pacientes** ❌
  - Campos: nombre, email, teléfono, proveedor asignado
  - Validación de formulario
  
- [ ] **Formulario de Creación de Proveedores** ❌
  - Campos: nombre, especialidad
  
- [ ] **Lista de Pacientes** ❌
  - Tabla con: nombre, estado actual, proveedor asignado
  - Botón para cambiar estado
  
- [ ] **Control de Actualización de Estado** ❌
  - Dropdown jerárquico de estados
  - Confirmación de cambio
  
- [ ] **Historial de Estados del Paciente** ❌
  - Timeline o lista cronológica
  - Mostrar fecha y estado anterior/nuevo

### 4.4 Integración con APIs ❌ **NO IMPLEMENTADO**
- [ ] Servicios para llamadas HTTP ❌
- [ ] Queries y mutations con TanStack Query ❌
- [ ] Manejo de estados de loading y error ❌

---

## 📌 Fase 5: Funcionalidades Avanzadas ❌ **NO IMPLEMENTADO**

### 5.1 Mejoras de UX
- [ ] Notificaciones toast para acciones exitosas/errores ❌
- [ ] Estados de carga (skeletons) ❌
- [ ] Paginación en listas grandes ❌

### 5.2 Validaciones del Negocio
- [ ] No permitir cambios de estado inválidos según jerarquía ❌
- [ ] Registrar automáticamente cambios en `status_history` ❌

---

## 📌 Fase 6: Documentación y Optimización Docker ❌ **NO IMPLEMENTADO**

### 6.1 Optimización de Docker
- [ ] Multi-stage builds para optimizar imágenes ❌
- [ ] Health checks para servicios ❌
- [ ] Volúmenes para persistencia de datos ❌
- [ ] Scripts de conveniencia (`npm run dev`, `npm run prod`) ❌

### 6.2 Documentación
- [x] **README.md** básico ✅ **GENÉRICO DE TURBOREPO**
- [ ] Instrucciones específicas del proyecto ❌
- [ ] Comandos para desarrollo y producción ❌
- [ ] Explicación de arquitectura del monorepo ❌
- [ ] Variables de entorno necesarias ❌
- [ ] Endpoints de la API ❌

### 6.3 Swagger Documentation
- [ ] Documentar todas las APIs con decoradores NestJS ❌
- [ ] Accesible en `/api/docs` ❌

---

## 🔧 **ESTADO ACTUAL DEL PROYECTO** ✅

### ✅ **IMPLEMENTADO:**
- Monorepo con TurboRepo
- Backend NestJS básico configurado
- Frontend Next.js con Tailwind CSS
- Configuraciones compartidas de ESLint y TypeScript
- Scripts de desarrollo y build
- Componentes básicos de UI

### ❌ **PENDIENTE:**
- Configuración completa de Docker
- Base de datos PostgreSQL y entidades
- APIs REST del backend
- Funcionalidades de gestión de pacientes
- Integración frontend-backend
- Variables de entorno
- Documentación específica del proyecto

---

## 🐳 Comandos Actuales Disponibles

```bash
# Desarrollo
bun dev                    # Ejecutar ambas apps
bun dev:frontend          # Solo frontend
bun dev:backend           # Solo backend

# Build
bun build                 # Build todas las apps

# Linting
bun lint                  # Lint todas las apps
bun format                # Format código
bun check-types          # Verificar tipos TypeScript
```

---

## 🔧 Configuración de Linters y Herramientas de Calidad ✅ **IMPLEMENTADO**

### Root Level ✅
- [x] **Prettier**: Formateo consistente de código ✅
- [ ] **EditorConfig**: Configuración de editor ❌
- [ ] **Husky**: Git hooks para calidad ❌
- [ ] **Lint-staged**: Linting optimizado en commits ❌

### Backend (NestJS) ✅
- [x] **ESLint**: Configuración NestJS ✅
- [x] **Prettier**: Integración con ESLint ✅
- [x] **TypeScript**: Configuración estricta ✅
- [x] **Scripts**: `lint`, `check-types`, etc. ✅

### Frontend (Next.js) ✅
- [x] **ESLint**: Configuración Next.js ✅
- [x] **Prettier**: Integración con ESLint ✅
- [x] **Tailwind CSS**: Configurado ✅
- [x] **TypeScript**: Configuración estricta ✅
- [x] **Scripts**: `lint`, `check-types`, etc. ✅

### Shared ✅
- [x] **Configuraciones compartidas**: eslint-config, typescript-config ✅

---

## 🛠️ Tecnologías Implementadas

**Backend:**
- [x] NestJS + TypeScript ✅
- [ ] PostgreSQL + TypeORM ❌
- [ ] Swagger para documentación ❌
- [ ] Docker + Docker Compose ❌

**Frontend:**
- [x] Next.js + TypeScript ✅ **CAMBIO: Next.js en lugar de React+Vite**
- [x] TailwindCSS ✅
- [ ] Redux Toolkit + TanStack Query ❌
- [x] Routing con Next.js ✅

**DevOps:**
- [ ] Docker & Docker Compose ❌
- [ ] Multi-stage builds ❌
- [ ] Environment variables ❌

**Monorepo:**
- [x] TurboRepo ✅ **CAMBIO: TurboRepo en lugar de estructura simple**
- [x] Paquetes compartidos ✅

---

## 📝 Próximos Pasos Recomendados

1. **Implementar configuración de Docker** (docker-compose.yml, Dockerfiles)
2. **Configurar base de datos PostgreSQL** y entidades TypeORM
3. **Desarrollar APIs REST** en el backend
4. **Crear interfaces de usuario** para gestión de pacientes
5. **Integrar frontend con backend**
6. **Agregar variables de entorno**
7. **Completar documentación**

---

## ⚡ Ventajas del Enfoque Actual

- **TurboRepo**: Mejor rendimiento y caching
- **Next.js**: SSR/SSG y routing integrado
- **Configuraciones compartidas**: Consistencia de código
- **TypeScript**: Type safety en todo el proyecto
- **Linting configurado**: Calidad de código desde el inicio 
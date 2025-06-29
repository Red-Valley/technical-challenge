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
- [x] Configurar variables de entorno compartidas ✅ **IMPLEMENTADO CON .env**
- [x] **Configurar Linters Root** ✅ **IMPLEMENTADO COMPLETAMENTE**:
  - [x] Configuración global de Prettier ✅
  - [x] EditorConfig para consistencia de editor ✅ **IMPLEMENTADO**
  - [x] Scripts de linting a nivel monorepo ✅
  - [x] Lint-staged para optimizar pre-commit ✅ **IMPLEMENTADO**

### 1.2 Configuración de Docker ✅ **IMPLEMENTADO COMPLETAMENTE**

- [x] **Dockerfile** para backend (NestJS) ✅ **CON IMAGEN OFICIAL BUN**
- [x] **Dockerfile** para frontend (Next.js) ✅ **CON IMAGEN OFICIAL BUN**
- [x] **docker-compose.yml** con servicios ✅:
  - `postgres` (base de datos PostgreSQL 16) ✅
  - `backend` (API NestJS con hot reload) ✅
  - `frontend` (Next.js app con hot reload) ✅
  - `adminer` (gestión de BD con interfaz web) ✅
- [x] Scripts de desarrollo y producción ✅ **CON SCRIPT DE CONVENIENCIA**

### 1.3 Configuración del Backend ✅ **IMPLEMENTADO BÁSICO**

- [x] Inicializar proyecto NestJS en `/apps/backend` ✅
- [x] Configurar estructura de carpetas básica ✅
- [ ] Instalar dependencias necesarias ❌:
  - `@nestjs/typeorm`, `typeorm`, `pg` (PostgreSQL)
  - `@nestjs/swagger` (documentación API)
  - `class-validator`, `class-transformer`
  - `uuid`
- [ ] Configurar conexión a PostgreSQL con variables de entorno ❌
- [x] **Configurar Linters Backend** ✅ **IMPLEMENTADO COMPLETAMENTE**:
  - [x] ESLint con configuración NestJS ✅
  - [x] Prettier para formateo de código ✅
  - [x] Husky para pre-commit hooks ✅ **IMPLEMENTADO**
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

## 📌 Fase 6: Documentación y Optimización Docker ✅ **IMPLEMENTADO COMPLETAMENTE**

### 6.1 Optimización de Docker ✅ **COMPLETADO**

- [x] Multi-stage builds para optimizar imágenes ✅ **DESARROLLO Y PRODUCCIÓN**
- [x] Health checks para servicios ✅ **POSTGRESQL CON VERIFICACIÓN**
- [x] Volúmenes para persistencia de datos ✅ **POSTGRES_DATA Y HOT RELOAD**
- [x] Scripts de conveniencia ✅ **DOCKER-SCRIPTS.SH CON TODOS LOS COMANDOS**

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
- **🐳 Configuración Docker completa con hot reload**
- **🗄️ Base de datos PostgreSQL 16 funcionando**
- **🔧 Adminer para gestión de BD**
- **📝 Variables de entorno configuradas**
- **🚀 Scripts de conveniencia (docker-scripts.sh)**
- **🐺 Husky y lint-staged configurados y funcionando**
- **⚙️ EditorConfig para consistencia de código**

### ❌ **PENDIENTE:**

- Entidades TypeORM y migraciones
- APIs REST del backend
- Funcionalidades de gestión de pacientes
- Integración frontend-backend
- Documentación específica del proyecto

---

## 🐳 Comandos Actuales Disponibles

### **Desarrollo Nativo (Bun):**

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

### **Desarrollo con Docker (Recomendado):**

```bash
# Comandos principales
./docker-scripts.sh dev           # Iniciar todos los servicios
./docker-scripts.sh build         # Construir imágenes
./docker-scripts.sh stop          # Detener servicios
./docker-scripts.sh restart       # Reiniciar servicios
./docker-scripts.sh clean         # Limpiar todo

# Monitoreo
./docker-scripts.sh status        # Ver estado de servicios
./docker-scripts.sh logs          # Ver todos los logs
./docker-scripts.sh logs-backend  # Solo logs backend
./docker-scripts.sh logs-frontend # Solo logs frontend
./docker-scripts.sh logs-db       # Solo logs base de datos

# Acceso a shells
./docker-scripts.sh shell-backend  # Terminal en backend
./docker-scripts.sh shell-frontend # Terminal en frontend
./docker-scripts.sh shell-db       # Terminal en PostgreSQL

# Gestión de BD
./docker-scripts.sh db-reset       # ⚠️  Reiniciar base de datos
```

### **URLs de Servicios:**

- 🌐 **Frontend**: http://localhost:3001
- 🔌 **Backend API**: http://localhost:3000
- 🗄️ **Adminer (BD)**: http://localhost:8080

### **Comandos de Calidad de Código:**

```bash
# Linting y formato
bun run lint:all          # Lint todo el proyecto
bun run format:all        # Formatear todo el proyecto
bun run lint:staged       # Ejecutar lint-staged manualmente
bun run pre-commit        # Simular pre-commit hook

# Comandos específicos por app
cd apps/backend && bun run lint:fix    # Fix linting backend
cd apps/frontend && bun run lint:fix   # Fix linting frontend
```

---

## 🔧 Configuración de Linters y Herramientas de Calidad ✅ **IMPLEMENTADO**

### Root Level ✅ **COMPLETAMENTE IMPLEMENTADO**

- [x] **Prettier**: Formateo consistente de código ✅
- [x] **EditorConfig**: Configuración de editor ✅ **IMPLEMENTADO**
- [x] **Husky**: Git hooks para calidad ✅ **IMPLEMENTADO**
- [x] **Lint-staged**: Linting optimizado en commits ✅ **IMPLEMENTADO**

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

- [x] Docker & Docker Compose ✅ **FUNCIONANDO CON HOT RELOAD**
- [x] Multi-stage builds ✅ **DESARROLLO Y PRODUCCIÓN**
- [x] Environment variables ✅ **CONFIGURADAS CON .env**

**Monorepo:**

- [x] TurboRepo ✅ **CAMBIO: TurboRepo en lugar de estructura simple**
- [x] Paquetes compartidos ✅

---

## 📝 Próximos Pasos Recomendados

1. ~~**Implementar configuración de Docker**~~ ✅ **COMPLETADO**
2. **Configurar entidades TypeORM** y migraciones de base de datos
3. **Desarrollar APIs REST** en el backend (Providers, Patients, Statuses)
4. **Crear interfaces de usuario** para gestión de pacientes
5. **Integrar frontend con backend** (axios, TanStack Query)
6. ~~**Agregar variables de entorno**~~ ✅ **COMPLETADO**
7. **Completar documentación específica** del proyecto

---

## ⚡ Ventajas del Enfoque Actual

- **TurboRepo**: Mejor rendimiento y caching
- **Next.js**: SSR/SSG y routing integrado
- **Configuraciones compartidas**: Consistencia de código
- **TypeScript**: Type safety en todo el proyecto
- **Linting configurado**: Calidad de código desde el inicio
- **🐳 Docker completo**: Desarrollo con hot reload y producción optimizada
- **🔧 Scripts de conveniencia**: Comandos fáciles para gestionar el proyecto

---

## 🎉 **LOGROS COMPLETADOS - CONFIGURACIÓN DOCKER**

### ✅ **Archivos Creados:**

- `apps/backend/Dockerfile` - Multi-stage build con imagen oficial Bun
- `apps/frontend/Dockerfile` - Multi-stage build con imagen oficial Bun
- `docker-compose.yml` - Orquestación completa de 4 servicios
- `docker-scripts.sh` - Script de conveniencia con 15+ comandos
- `env.template` - Variables de entorno documentadas
- `init-db/01-init.sql` - Inicialización de PostgreSQL
- `.dockerignore` - Optimización de builds

### ✅ **Servicios Funcionando:**

- **PostgreSQL 16**: Base de datos con health checks
- **Backend NestJS**: API con hot reload en puerto 3000
- **Frontend Next.js**: App con hot reload en puerto 3001
- **Adminer**: Gestión visual de BD en puerto 8080

### ✅ **Características Implementadas:**

- **Hot Reload**: Cambios instantáneos en desarrollo
- **Multi-stage builds**: Optimización para desarrollo/producción
- **Volúmenes**: Persistencia de datos y montaje de código
- **Health checks**: Verificación automática de servicios
- **Networking**: Comunicación interna entre servicios
- **Variables de entorno**: Configuración flexible
- **Scripts de conveniencia**: Comandos fáciles de usar

### ✅ **Comandos Disponibles:**

```bash
# Gestión principal
./docker-scripts.sh dev     # ⭐ Más importante
./docker-scripts.sh status  # Ver estado
./docker-scripts.sh logs    # Ver logs
./docker-scripts.sh clean   # Limpiar todo

# Desarrollo
./docker-scripts.sh shell-backend  # Terminal backend
./docker-scripts.sh logs-frontend  # Logs específicos
./docker-scripts.sh db-reset       # Reiniciar BD
```

---

## 🐺 **LOGROS COMPLETADOS - HUSKY Y LINT-STAGED**

### ✅ **Herramientas Configuradas:**

- **Husky 9.1.7**: Git hooks para calidad de código
- **lint-staged 16.1.2**: Linting optimizado en commits
- **EditorConfig**: Consistencia entre editores

### ✅ **Archivos Creados/Modificados:**

- `.husky/pre-commit` - Hook de pre-commit configurado
- `.editorconfig` - Configuración de editores
- `package.json` - Scripts y configuración lint-staged
- `apps/backend/package.json` - Script lint:fix agregado
- `apps/frontend/package.json` - Script lint:fix agregado

### ✅ **Funcionalidades Implementadas:**

- **Pre-commit hook**: Se ejecuta automáticamente antes de cada commit
- **Linting selectivo**: Solo procesa archivos en staging area
- **Formato automático**: Prettier se ejecuta en archivos modificados
- **Backup automático**: Git stash para revertir cambios si hay errores
- **Configuración por tipo de archivo**: Diferentes reglas según extensión

### ✅ **Configuración lint-staged:**

```json
{
  "*.{json,md,yml,yaml}": ["prettier --write"],
  "apps/backend/**/*.{ts,js}": ["cd apps/backend && bun run lint:fix", "prettier --write"],
  "apps/frontend/**/*.{ts,tsx,js,jsx}": ["cd apps/frontend && bun run lint:fix", "prettier --write"],
  "packages/**/*.{ts,js}": ["prettier --write"],
  "*.{ts,tsx,js,jsx}": ["prettier --write"]
}
```

### ✅ **Flujo de Trabajo:**

1. **Desarrollar código** normalmente
2. **git add** archivos modificados
3. **git commit** - Hook se ejecuta automáticamente
4. **Linting automático** solo en archivos staged
5. **Commit exitoso** con código formateado

### 🎯 **Próximo Paso:** Configurar entidades TypeORM

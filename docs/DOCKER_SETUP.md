# 🐳 Configuración Docker - Sistema de Gestión de Pacientes

## 📋 Descripción

Esta configuración Docker proporciona un entorno completo de desarrollo con **hot reload** para el Sistema de Gestión de Pacientes, incluyendo:

- 🖥️ **Backend**: NestJS con TypeScript
- 🌐 **Frontend**: Next.js con TailwindCSS  
- 🗄️ **Base de Datos**: PostgreSQL 16
- 🔧 **Administrador DB**: Adminer
- 🔄 **Hot Reload**: Cambios en tiempo real

---

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

```bash
# Crear archivo .env desde el template
cp env.template .env

# O usar el script automático
./docker-scripts.sh dev
```

### 2. Iniciar Servicios

```bash
# Opción 1: Usar el script de conveniencia (recomendado)
./docker-scripts.sh dev

# Opción 2: Docker Compose directo
docker-compose up -d
```

### 3. Acceder a los Servicios

Una vez iniciados los servicios, puedes acceder a:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🌐 **Frontend** | http://localhost:3001 | Aplicación Next.js |
| 🔌 **Backend API** | http://localhost:3000 | API NestJS |
| 🗄️ **Adminer** | http://localhost:8080 | Gestión de Base de Datos |
| 📊 **Base de Datos** | localhost:5432 | PostgreSQL (acceso directo) |

---

## 🛠️ Script de Conveniencia

El archivo `docker-scripts.sh` proporciona comandos útiles:

```bash
# Ver ayuda completa
./docker-scripts.sh help

# Comandos principales
./docker-scripts.sh dev           # Iniciar en desarrollo
./docker-scripts.sh build         # Construir imágenes
./docker-scripts.sh stop          # Detener servicios
./docker-scripts.sh restart       # Reiniciar servicios
./docker-scripts.sh logs          # Ver todos los logs
./docker-scripts.sh clean         # Limpiar todo
./docker-scripts.sh status        # Ver estado
```

### Comandos de Logs Específicos

```bash
./docker-scripts.sh logs-backend   # Solo logs del backend
./docker-scripts.sh logs-frontend  # Solo logs del frontend  
./docker-scripts.sh logs-db        # Solo logs de la BD
```

### Acceso a Shells

```bash
./docker-scripts.sh shell-backend   # Terminal en backend
./docker-scripts.sh shell-frontend  # Terminal en frontend
./docker-scripts.sh shell-db        # Terminal en PostgreSQL
```

---

## 🔧 Configuración Detallada

### Variables de Entorno

El archivo `env.template` contiene todas las variables necesarias:

```env
# Base de Datos
DB_HOST=postgres
DB_PORT=5432
DB_NAME=technical_challenge
DB_USER=postgres  
DB_PASSWORD=postgres

# Backend
API_PORT=3000
JWT_SECRET=your-secret-key
NODE_ENV=development

# Frontend
FRONTEND_PORT=3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Adminer
ADMINER_PORT=8080
```

### Estructura de Servicios

```yaml
services:
  postgres:    # Base de datos PostgreSQL
  backend:     # API NestJS (Puerto 3000)
  frontend:    # App Next.js (Puerto 3001)  
  adminer:     # Gestión DB (Puerto 8080)
```

---

## 🔄 Hot Reload

### Backend (NestJS)

- **Volumen**: `./apps/backend:/app`
- **Comando**: `bun run dev`
- **Archivos observados**: `src/**/*.ts`

### Frontend (Next.js)

- **Volumen**: `./apps/frontend:/app`
- **Comando**: `bun run dev`
- **Archivos observados**: `src/**/*`, `pages/**/*`

### Base de Datos

- **Volumen persistente**: `postgres_data`
- **Scripts de inicialización**: `./init-db/`

---

## 🗄️ Gestión de Base de Datos

### Acceso con Adminer

1. Ir a http://localhost:8080
2. Usar credenciales:
   - **Sistema**: PostgreSQL
   - **Servidor**: postgres
   - **Usuario**: postgres
   - **Contraseña**: postgres
   - **Base de datos**: technical_challenge

### Acceso Directo

```bash
# Usando el script
./docker-scripts.sh shell-db

# O directamente
docker-compose exec postgres psql -U postgres -d technical_challenge
```

### Reiniciar Base de Datos

```bash
# ⚠️ CUIDADO: Elimina todos los datos
./docker-scripts.sh db-reset
```

---

## 🐛 Solución de Problemas

### Problemas Comunes

**1. Puerto ya en uso**

```bash
# Verificar qué está usando el puerto
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Cambiar puertos en .env
API_PORT=3002
FRONTEND_PORT=3003
DB_PORT=5433
```

**2. Permisos de archivos**

```bash
# Hacer ejecutable el script
chmod +x docker-scripts.sh

# Cambiar propietario de archivos
sudo chown -R $USER:$USER ./apps
```

**3. Problemas de caché**

```bash
# Limpiar caché de Docker
./docker-scripts.sh clean

# Construir sin caché
docker-compose build --no-cache
```

**4. Hot reload no funciona**

```bash
# Verificar variables de entorno en .env
WATCHPACK_POLLING=true
CHOKIDAR_USEPOLLING=true

# Reiniciar servicios
./docker-scripts.sh restart
```

### Logs de Depuración

```bash
# Ver todos los logs
./docker-scripts.sh logs

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

---

## 📊 Monitoreo

### Estado de Servicios

```bash
# Ver estado
./docker-scripts.sh status

# Verificar salud
docker-compose ps
```

### Uso de Recursos

```bash
# Ver estadísticas
docker stats

# Ver imágenes
docker images

# Ver volúmenes
docker volume ls
```

---

## 🧹 Limpieza

### Limpieza Completa

```bash
# Eliminar todo (contenedores, imágenes, volúmenes)
./docker-scripts.sh clean
```

### Limpieza Selectiva

```bash
# Solo detener servicios
./docker-scripts.sh stop

# Solo eliminar contenedores
docker-compose down

# Eliminar también volúmenes
docker-compose down -v
```

---

## 🔐 Seguridad

### Producción

Para producción, cambiar:

```env
# Variables críticas
JWT_SECRET=tu-clave-super-secreta-de-produccion
DB_PASSWORD=contraseña-fuerte-de-produccion
NODE_ENV=production

# Puertos internos
API_PORT=3000
FRONTEND_PORT=3000
```

### Buenas Prácticas

1. **Nunca commitear** archivos `.env` con credenciales reales
2. **Usar secrets** de Docker en producción
3. **Configurar HTTPS** con reverse proxy
4. **Restringir acceso** a Adminer en producción

---

## 📝 Logs de Desarrollo

Los logs se pueden ver en tiempo real:

```bash
# Todos los servicios
./docker-scripts.sh logs

# Filtrar por servicio
./docker-scripts.sh logs-backend | grep ERROR
./docker-scripts.sh logs-frontend | grep WARN
```

---

## 💡 Tips de Desarrollo

1. **Usar el script**: `./docker-scripts.sh` es más conveniente que `docker-compose`
2. **Hot reload**: Los cambios se reflejan automáticamente
3. **Debugging**: Usar `./docker-scripts.sh shell-backend` para depurar
4. **Base de datos**: Adminer es útil para ver datos en tiempo real
5. **Logs**: Usar logs específicos para depurar problemas

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Clonar el repositorio
2. Crear archivo `.env` desde `env.template`
3. Ejecutar `./docker-scripts.sh dev`
4. Desarrollar con hot reload habilitado
5. Hacer commit de los cambios (sin `.env`)

---

## 📞 Soporte

Si tienes problemas:

1. Verificar que Docker esté ejecutándose
2. Revisar los logs: `./docker-scripts.sh logs`
3. Limpiar y reiniciar: `./docker-scripts.sh clean && ./docker-scripts.sh dev`
4. Verificar puertos disponibles
5. Consultar la documentación de Docker Compose 
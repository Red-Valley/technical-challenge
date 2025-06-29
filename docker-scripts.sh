#!/bin/bash

# Script de conveniencia para Docker - Sistema de Gestión de Pacientes
# Hacer ejecutable: chmod +x docker-scripts.sh

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}📋 Sistema de Gestión de Pacientes - Docker Scripts${NC}"
    echo ""
    echo "Uso: ./docker-scripts.sh [COMANDO]"
    echo ""
    echo "Comandos disponibles:"
    echo "  dev           - Iniciar todos los servicios en modo desarrollo"
    echo "  build         - Construir todas las imágenes Docker"
    echo "  stop          - Detener todos los servicios"
    echo "  restart       - Reiniciar todos los servicios"
    echo "  logs          - Ver logs de todos los servicios"
    echo "  logs-backend  - Ver logs solo del backend"
    echo "  logs-frontend - Ver logs solo del frontend"
    echo "  logs-db       - Ver logs solo de la base de datos"
    echo "  clean         - Limpiar contenedores, imágenes y volúmenes"
    echo "  db-reset      - Reiniciar la base de datos (¡CUIDADO: borra todos los datos!)"
    echo "  status        - Ver estado de los servicios"
    echo "  shell-backend - Abrir shell en el contenedor del backend"
    echo "  shell-frontend- Abrir shell en el contenedor del frontend"
    echo "  shell-db      - Abrir shell en el contenedor de la base de datos"
    echo ""
    echo "Ejemplos:"
    echo "  ./docker-scripts.sh dev      # Iniciar en modo desarrollo"
    echo "  ./docker-scripts.sh logs     # Ver todos los logs"
    echo "  ./docker-scripts.sh clean    # Limpiar todo"
}

# Función para iniciar en modo desarrollo
start_dev() {
    echo -e "${GREEN}🚀 Iniciando servicios en modo desarrollo...${NC}"
    
    # Crear archivo .env si no existe
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠️  Creando archivo .env desde .env.development...${NC}"
        cp .env.development .env
    fi
    
    docker compose up -d
    echo -e "${GREEN}✅ Servicios iniciados!${NC}"
    echo ""
    echo -e "${BLUE}📍 URLs de acceso:${NC}"
    echo "  🌐 Frontend: http://localhost:3001"
    echo "  🔌 Backend API: http://localhost:3000"
    echo "  🗄️  Adminer (DB): http://localhost:8080"
    echo ""
    echo -e "${YELLOW}💡 Para ver logs: ./docker-scripts.sh logs${NC}"
}

# Función para construir imágenes
build_images() {
    echo -e "${GREEN}🔨 Construyendo imágenes Docker...${NC}"
    docker compose build --no-cache
    echo -e "${GREEN}✅ Imágenes construidas!${NC}"
}

# Función para detener servicios
stop_services() {
    echo -e "${YELLOW}⏹️  Deteniendo servicios...${NC}"
    docker compose down
    echo -e "${GREEN}✅ Servicios detenidos!${NC}"
}

# Función para reiniciar servicios
restart_services() {
    echo -e "${YELLOW}🔄 Reiniciando servicios...${NC}"
    docker compose restart
    echo -e "${GREEN}✅ Servicios reiniciados!${NC}"
}

# Función para ver logs
show_logs() {
    echo -e "${BLUE}📄 Mostrando logs de todos los servicios...${NC}"
    docker compose logs -f
}

# Función para ver logs del backend
show_backend_logs() {
    echo -e "${BLUE}📄 Mostrando logs del backend...${NC}"
    docker compose logs -f backend
}

# Función para ver logs del frontend
show_frontend_logs() {
    echo -e "${BLUE}📄 Mostrando logs del frontend...${NC}"
    docker compose logs -f frontend
}

# Función para ver logs de la DB
show_db_logs() {
    echo -e "${BLUE}📄 Mostrando logs de la base de datos...${NC}"
    docker compose logs -f postgres
}

# Función para limpiar todo
clean_all() {
    echo -e "${RED}🧹 Limpiando contenedores, imágenes y volúmenes...${NC}"
    read -p "¿Estás seguro? Esto eliminará todos los datos (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker compose down -v --remove-orphans
        docker system prune -a -f
        echo -e "${GREEN}✅ Limpieza completada!${NC}"
    else
        echo -e "${YELLOW}❌ Operación cancelada.${NC}"
    fi
}

# Función para reiniciar la base de datos
reset_database() {
    echo -e "${RED}🗄️  Reiniciando base de datos...${NC}"
    read -p "¿Estás seguro? Esto eliminará todos los datos de la BD (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker compose stop postgres
        docker compose rm -f postgres
        docker volume rm technical-challenge_postgres_data 2>/dev/null || true
        docker compose up -d postgres
        echo -e "${GREEN}✅ Base de datos reiniciada!${NC}"
    else
        echo -e "${YELLOW}❌ Operación cancelada.${NC}"
    fi
}

# Función para ver estado
show_status() {
    echo -e "${BLUE}📊 Estado de los servicios:${NC}"
    docker compose ps
}

# Función para abrir shell en backend
shell_backend() {
    echo -e "${BLUE}🐚 Abriendo shell en el backend...${NC}"
    docker compose exec backend sh
}

# Función para abrir shell en frontend
shell_frontend() {
    echo -e "${BLUE}🐚 Abriendo shell en el frontend...${NC}"
    docker compose exec frontend sh
}

# Función para abrir shell en DB
shell_db() {
    echo -e "${BLUE}🐚 Abriendo shell en la base de datos...${NC}"
    docker compose exec postgres psql -U postgres -d technical_challenge
}

# Procesar argumentos
case "${1:-}" in
    "dev")
        start_dev
        ;;
    "build")
        build_images
        ;;
    "stop")
        stop_services
        ;;
    "restart")
        restart_services
        ;;
    "logs")
        show_logs
        ;;
    "logs-backend")
        show_backend_logs
        ;;
    "logs-frontend")
        show_frontend_logs
        ;;
    "logs-db")
        show_db_logs
        ;;
    "clean")
        clean_all
        ;;
    "db-reset")
        reset_database
        ;;
    "status")
        show_status
        ;;
    "shell-backend")
        shell_backend
        ;;
    "shell-frontend")  
        shell_frontend
        ;;
    "shell-db")
        shell_db
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    "")
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando desconocido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac 
-- Script de inicialización de la base de datos
-- Sistema de Gestión de Pacientes

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Comentario de inicio
DO $$
BEGIN
    RAISE NOTICE 'Inicializando base de datos del Sistema de Gestión de Pacientes...';
END $$;

-- Crear schema si no existe
CREATE SCHEMA IF NOT EXISTS public;

-- Comentario de finalización
DO $$
BEGIN
    RAISE NOTICE 'Base de datos inicializada correctamente!';
    RAISE NOTICE 'Puedes acceder a Adminer en: http://localhost:8080';
    RAISE NOTICE 'Credenciales - Usuario: postgres, Contraseña: postgres, Base de datos: technical_challenge';
END $$; 
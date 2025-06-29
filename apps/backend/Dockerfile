# Multi-stage build for NestJS Backend
FROM oven/bun:1-alpine AS base

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY bun.lockb* ./
COPY turbo.json ./

# Copy shared packages
COPY packages/ ./packages/

# Copy backend app files
COPY apps/backend/package*.json ./apps/backend/
COPY apps/backend/bun.lockb* ./apps/backend/

# Development stage
FROM base AS development

# Copy backend source code
COPY apps/backend/ ./apps/backend/

# Install dependencies from root
RUN bun install

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose port
EXPOSE 3000

# Start development server with hot reload
CMD ["bun", "run", "dev"]

# Production stage
FROM base AS production

# Copy source code
COPY . .

# Install production dependencies
RUN bun install --production

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["bun", "run", "start:prod"] 
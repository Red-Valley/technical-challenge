# Multi-stage build for Next.js Frontend
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

# Copy frontend app files
COPY apps/frontend/package*.json ./apps/frontend/
COPY apps/frontend/bun.lockb* ./apps/frontend/

# Development stage
FROM base AS development

# Copy frontend source code
COPY apps/frontend/ ./apps/frontend/

# Install dependencies from root
RUN bun install

# Set working directory to frontend
WORKDIR /app/apps/frontend

# Expose port
EXPOSE 3001

# Start development server with hot reload
CMD ["bun", "run", "dev"]

# Production stage
FROM base AS production

# Copy source code
COPY . .

# Install dependencies
RUN bun install

# Build the application
RUN bun run build

# Expose port
EXPOSE 3001

# Start production server
CMD ["bun", "run", "start"] 

# Manager

This repository contains a microservices system with a frontend in React/Vite and a backend in NestJS, using PostgreSQL and RabbitMQ as supporting services.

## Architecture and Design Decisions

- Microservices: Each backend module runs as an independent microservice.

- RabbitMQ: Used for asynchronous communication and background task processing.

- PostgreSQL: Centralized relational database for all services.

- Frontend: Vite application for fast reloads and agile development.

## Prerequisites

- Docker and Docker Compose installed
- Node.js version 18 or higher
- npm

## Steps to Run the Project Locally

1. Generate the environment files

- Copy the create-envs.sh file to the root of the repository

- Run the following command in the terminal. This will create all necessary .env files (content of create-envs.sh file is at the end of this readme):

`` ./create-envs.sh ``


2. Start backend services

- Go to the backend folder:

`` cd backend/manager ``

- Start the RabbitMQ and PostgreSQL images:

`` docker compose -f docker-compose.dev.yml up -d ``

- Install backend dependencies:
`` npm install ``

- Run the database migrations:
`` npm run typeorm:statuses ``

- Start all microservices:
`` npm run start:all ``

3. Start the frontend

- Open another terminal and go to the frontend folder:
`` cd frontend/manager-app ``

- Install frontend dependencies:
`` npm install ``

- Start the frontend with Vite:
`` npm run dev ``


### Recommended content of ./create-envs.sh

``` 
#!/bin/bash

# Backend manager root .env
cat > backend/manager/.env <<EOL
DATABASE_URL="file:./dev.db"

RABBITMQ_USER=marioch
RABBITMQ_PASS=marioch123
POSTGRES_USER=marioch
POSTGRES_PASSWORD=marioch123
POSTGRES_PORT=5437
EOL

# Backend manager-api-gateway .env
cat > backend/manager/apps/manager-api-gateway/.env <<EOL
NODE_ENV=dev
HOST=0.0.0.0
PORT=3000
RMQ_USER=marioch
RMQ_PASSWORD=marioch123
RABBITMQ_URL=localhost:5672
EOL

# Backend patients .env
cat > backend/manager/apps/patients/.env <<EOL
RMQ_USER=marioch
RMQ_PASSWORD=marioch123
RABBITMQ_URL=localhost:5672

DB_HOST=localhost
DB_PORT=5437
DB_USERNAME=marioch
DB_PASSWORD=marioch123
DB_DATABASE=patient_db
EOL

# Backend providers .env
cat > backend/manager/apps/providers/.env <<EOL
RMQ_USER=marioch
RMQ_PASSWORD=marioch123
RABBITMQ_URL=localhost:5672

DB_HOST=localhost
DB_PORT=5437
DB_USERNAME=marioch
DB_PASSWORD=marioch123
DB_DATABASE=provider_db
EOL

# Backend status-histories .env
cat > backend/manager/apps/status-histories/.env <<EOL
RMQ_USER=marioch
RMQ_PASSWORD=marioch123
RABBITMQ_URL=localhost:5672

DB_HOST=localhost
DB_PORT=5437
DB_USERNAME=marioch
DB_PASSWORD=marioch123
DB_DATABASE=status_history_db
EOL

# Backend statuses .env
cat > backend/manager/apps/statuses/.env <<EOL
RMQ_USER=marioch
RMQ_PASSWORD=marioch123
RABBITMQ_URL=localhost:5672

DB_HOST=localhost
DB_PORT=5437
DB_USERNAME=marioch
DB_PASSWORD=marioch123
DB_DATABASE=status_db
EOL

# Frontend .env.local
cat > frontend/manager-app/.env.local <<EOL
VITE_STAGE=dev
VITE_API_URL=http://localhost:3000
EOL

echo "Todos los archivos .env fueron creados correctamente."

 ```

 
## Authors

- [@MarioCuberos](https://www.linkedin.com/in/mario-enrique-cuberos-hernandez/)
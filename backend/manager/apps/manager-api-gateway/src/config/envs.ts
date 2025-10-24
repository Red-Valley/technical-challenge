import { MANAGER_NAMESPACE } from '@app/contracts/manager-api-gateway/manager.constants';
import { config } from 'dotenv';
import { resolve } from 'path';
import { number, object, string } from 'yup';

config({
  path: resolve(process.cwd(), `apps/${MANAGER_NAMESPACE}/.env`),
});

const envVarsSchema = object({
  NODE_ENV: string().oneOf(['dev', 'prod', 'test']).default('dev'),
  HOST: string().default('0.0.0.0'),
  PORT: number().default(3000),
  RMQ_USER: string().default('guest'),
  RMQ_PASSWORD: string().default('guest'),
  RABBITMQ_URL: string().default('localhost:5672'),
  DB_HOST: string().default('localhost'),
  DB_PORT: number().default(5432),
  DB_USERNAME: string().default('root'),
  DB_PASSWORD: string().default('root'),
  DB_DATABASE: string().default('test'),
}).noUnknown();

export const envs = envVarsSchema.validateSync(process.env);

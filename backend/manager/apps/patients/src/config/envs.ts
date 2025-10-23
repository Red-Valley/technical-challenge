import { PATIENTS_NAMESPACE } from '@app/contracts/patients/patients.namespace';
import { config } from 'dotenv';
import { resolve } from 'path';
import { number, object, string } from 'yup';

config({
  path: resolve(process.cwd(), `apps/${PATIENTS_NAMESPACE}/.env`),
});

const envVarsSchema = object({
  NODE_ENV: string().oneOf(['dev', 'prod', 'test']).default('dev'),
  HOST: string().default('0.0.0.0'),
  PORT: number().default(3000),
  RMQ_USER: string().default('guest'),
  RMQ_PASSWORD: string().default('guest'),
  RABBITMQ_URL: string().default('localhost:5672'),
}).noUnknown();

export const envs = envVarsSchema.validateSync(process.env);

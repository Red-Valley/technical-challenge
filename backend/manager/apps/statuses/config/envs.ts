import { STATUSES_NAMESPACE } from '@app/contracts/statuses/statuses.constants';
import { config } from 'dotenv';
import { resolve } from 'path';
import { number, object, string } from 'yup';

config({
  path: resolve(process.cwd(), `apps/${STATUSES_NAMESPACE}/.env`),
});

const envVarsSchema = object({
  RMQ_USER: string().required(),
  RMQ_PASSWORD: string().required(),
  RABBITMQ_URL: string().required(),
  DB_HOST: string().required(),
  DB_PORT: number().required(),
  DB_USERNAME: string().required(),
  DB_PASSWORD: string().required(),
  DB_DATABASE: string().required(),
}).noUnknown();

export const envs = envVarsSchema.validateSync(process.env);

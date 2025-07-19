import express from 'express';
import morgan from 'morgan';
import patientController from './controllers/patient-controller';
import statusController from './controllers/status-controller';
import statusHistoryController from './controllers/status-history-controller';
import providerController from './controllers/provider-controller';
import API_ROTES from './routes/api-routes';
import * as dotenv from 'dotenv';

/**
 * Env variables
 */
dotenv.config(); // Loads variables from .env

/**
 * Server
 */
const app = express();

/**
 * Middlewares
 */
app.use(morgan('dev'));
app.use(express.json());

/**
 * Controllers
 */
app.use(API_ROTES.patient, patientController);
app.use(API_ROTES.status, statusController);
app.use(API_ROTES.statusHistory, statusHistoryController);
app.use(API_ROTES.provider, providerController);

/**
 * Export app
 */
export default app;

import express from 'express';
import { PATIENT_ROUTES } from '../routes/controller-routes';
import LANG from '../lang';

const patientController = express.Router();

/**
 * Controller Routes
 */

// *Greet
patientController.get(PATIENT_ROUTES.greet, (req, res) => {
    res.json('Hello world from Block controller');
});

// *Creates a patient
patientController.post(PATIENT_ROUTES.create, async (req, res) => {
    try {
        // Logic
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

export default patientController;

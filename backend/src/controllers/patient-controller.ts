import express from 'express';
import { PATIENT_ROUTES } from '../routes/controller-routes';
import LANG from '../lang';

const patientController = express.Router();

/**
 * Controller Routes
 */

// *Greet
patientController.get(PATIENT_ROUTES.greet, (req, res) => {
    res.json('Hello world from patient controller');
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

// *Get all
patientController.get(PATIENT_ROUTES.getAll, (req, res) => {
    res.json('Hello world from patient controller');
});

// *Get with ID
patientController.get(PATIENT_ROUTES.getWithId, (req, res) => {
    res.json('Hello world from patient controller');
});

// *Put with ID
patientController.put(PATIENT_ROUTES.putWithId, (req, res) => {
    res.json('Hello world from patient controller');
});

// *Delete with ID
patientController.put(PATIENT_ROUTES.deleteWithId, (req, res) => {
    res.json('Hello world from patient controller');
});

export default patientController;

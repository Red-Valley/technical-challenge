import express from 'express';
import { PATIENT_ROUTES } from '../routes/controller-routes';
import patientDBctions from '../database/actions/patient-db-actions';
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
        const result = await patientDBctions.create(req.body);

        res.status(201).json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Get all
patientController.get(PATIENT_ROUTES.findAll, (req, res) => {
    res.json('Hello world from patient controller');
});

// *Get with ID
patientController.get(PATIENT_ROUTES.findOneById, (req, res) => {
    res.json('Hello world from patient controller');
});

// *Put with ID
patientController.put(PATIENT_ROUTES.updateOneById, (req, res) => {
    res.json('Hello world from patient controller');
});

// *Delete with ID
patientController.put(PATIENT_ROUTES.deleteOneById, (req, res) => {
    res.json('Hello world from patient controller');
});

export default patientController;

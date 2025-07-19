import express from 'express';
import { PATIENT_ROUTES } from '../routes/controller-routes';
import patientDBActions from '../database/actions/patient-db-actions';
import { validate as uuidValidate } from 'uuid';
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
        const result = await patientDBActions.create(req.body);

        res.status(201).json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

//Find all
patientController.get(PATIENT_ROUTES.findAll, async (req, res) => {
    try {
        const result = await patientDBActions.findAll();

        res.json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Find one by ID
patientController.get(PATIENT_ROUTES.findOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await patientDBActions.findOneById(req.params.id);

            res.json(result);
        } catch (error) {
            throw new Error(
                `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
            );
        }
    } else {
        res.status(400).json(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${LANG.ENGLISH.errors.uuidError}`
        );
    }
});

// *Updates a patient
patientController.put(PATIENT_ROUTES.updateOneById, async (req, res) => {
    try {
        const result = await patientDBActions.updateOneById(req.body);

        res.status(200).json(LANG.ENGLISH.operations.update);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Deletes a patient
patientController.delete(PATIENT_ROUTES.deleteOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await patientDBActions.deleteOneById(req.params.id);

            res.status(200).json({
                message: LANG.ENGLISH.operations.delete,
                deleted: result
            });
        } catch (error) {
            throw new Error(
                `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
            );
        }
    } else {
        res.status(400).json(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${LANG.ENGLISH.errors.uuidError}`
        );
    }
});

export default patientController;

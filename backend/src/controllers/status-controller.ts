import express from 'express';
import { STATUS_ROUTES } from '../routes/controller-routes';
import statusDBctions from '../database/actions/status-db-actions';
import { validate as uuidValidate } from 'uuid';
import LANG from '../lang';

const statusController = express.Router();

/**
 * Controller Routes
 */

// *Greet
statusController.get(STATUS_ROUTES.greet, (req, res) => {
    res.json('Hello world from status controller');
});

// *Creates a status
statusController.post(STATUS_ROUTES.create, async (req, res) => {
    try {
        // Logic
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Creates a status
statusController.post(STATUS_ROUTES.create, async (req, res) => {
    try {
        const result = await statusDBctions.create(req.body);

        res.status(201).json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

//Find all
statusController.get(STATUS_ROUTES.findAll, async (req, res) => {
    try {
        const result = await statusDBctions.findAll();

        res.json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Find one by ID
statusController.get(STATUS_ROUTES.findOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await statusDBctions.findOneById(req.params.id);

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

// *Updates a status
statusController.put(STATUS_ROUTES.updateOneById, async (req, res) => {
    try {
        const result = await statusDBctions.updateOneById(req.body);

        res.status(200).json(LANG.ENGLISH.operations.update);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Deletes a status
statusController.delete(STATUS_ROUTES.deleteOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await statusDBctions.deleteOneById(req.params.id);

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

export default statusController;

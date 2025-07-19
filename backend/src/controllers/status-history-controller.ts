import express from 'express';
import { STATUS_HISTORY_ROUTES } from '../routes/controller-routes';
import statusHistoryDBActions from '../database/actions/status-history-db-actions';
import { validate as uuidValidate } from 'uuid';
import LANG from '../lang';

const statusHistoryController = express.Router();

/**
 * Controller Routes
 */

// *Greet
statusHistoryController.get(STATUS_HISTORY_ROUTES.greet, (req, res) => {
    res.json('Hello world from status history controller');
});

// *Creates a status history
statusHistoryController.post(STATUS_HISTORY_ROUTES.create, async (req, res) => {
    try {
        const result = await statusHistoryDBActions.create(req.body);

        res.status(201).json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

//Find all
statusHistoryController.get(STATUS_HISTORY_ROUTES.findAll, async (req, res) => {
    try {
        const result = await statusHistoryDBActions.findAll();

        res.json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Find one by ID
statusHistoryController.get(STATUS_HISTORY_ROUTES.findOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await statusHistoryDBActions.findOneById(req.params.id);

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
statusHistoryController.put(STATUS_HISTORY_ROUTES.updateOneById, async (req, res) => {
    try {
        const result = await statusHistoryDBActions.updateOneById(req.body);

        res.status(200).json(LANG.ENGLISH.operations.update);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Deletes a patient
statusHistoryController.delete(STATUS_HISTORY_ROUTES.deleteOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await statusHistoryDBActions.deleteOneById(req.params.id);

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

export default statusHistoryController;

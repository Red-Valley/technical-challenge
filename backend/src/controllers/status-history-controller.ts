import express from 'express';
import { STATUS_HISTORY_ROUTES } from '../routes/controller-routes';
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
        // Logic
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

export default statusHistoryController;

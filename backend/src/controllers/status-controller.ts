import express from 'express';
import { STATUS_ROUTES } from '../routes/controller-routes';
import LANG from '../lang';

const statusController = express.Router();

/**
 * Controller Routes
 */

// *Greet
statusController.get(STATUS_ROUTES.greet, (req, res) => {
    res.json('Hello world from Block controller');
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

export default statusController;

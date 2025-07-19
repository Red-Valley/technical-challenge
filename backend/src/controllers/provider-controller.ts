import express from 'express';
import { PROVIDER_ROUTES } from '../routes/controller-routes';
import providerDBctions from '../database/actions/provider-db-actions';
import LANG from '../lang';

const providerController = express.Router();

/**
 * Controller Routes
 */

// *Greet
providerController.get(PROVIDER_ROUTES.greet, (req, res) => {
    res.json('Hello world from provider controller');
});

// *Creates a provider
providerController.post(PROVIDER_ROUTES.create, async (req, res) => {
    try {
        const result = await providerDBctions.create(req.body);

        res.status(201).json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Find one by ID
providerController.post(PROVIDER_ROUTES.findOneById, async (req, res) => {
    try {
        console.log('id param:', req.params);
        
        const result = await providerDBctions.findOneById(req.params.id);

        res.json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

export default providerController;

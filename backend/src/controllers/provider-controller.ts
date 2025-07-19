import express from 'express';
import { PROVIDER_ROUTES } from '../routes/controller-routes';
import providerDBctions from '../database/actions/provider-db-actions';
import { validate as uuidValidate } from 'uuid';
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

//Find all
providerController.get(PROVIDER_ROUTES.findAll, async (req, res) => {
    try {
        const result = await providerDBctions.findAll();

        res.json(result);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Find one by ID
providerController.get(PROVIDER_ROUTES.findOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await providerDBctions.findOneById(req.params.id);

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

// *Updates a provider
providerController.put(PROVIDER_ROUTES.updateOneById, async (req, res) => {
    try {
        const result = await providerDBctions.updateOneById(req.body);

        res.status(200).json(LANG.ENGLISH.operations.update);
    } catch (error) {
        throw new Error(
            `${LANG.ENGLISH.errors.apiError}: ${req.originalUrl}, ${LANG.ENGLISH.errors.description}: ${error}`
        );
    }
});

// *Deletes a provider
providerController.delete(PROVIDER_ROUTES.deleteOneById, async (req, res) => {
    if (uuidValidate(req.params.id)) {
        try {
            const result = await providerDBctions.deleteOneById(req.params.id);

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

export default providerController;

import express from 'express';
import { getLocalModels, getRunningModels, pullModel } from '#controllers/modelController.js';

export const modelRouter = express.Router();

// Link controllers to the router.

modelRouter.route('/').get(getLocalModels);
modelRouter.route('/running').get(getRunningModels);
modelRouter.route('/pull').post(pullModel);

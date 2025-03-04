import express from 'express';
import { deleteModel, getLocalModels, getRunningModels, loadModel, pullModel, unloadModel } from '../controllers/modelController.js';

export const modelRouter = express.Router();

// Link controllers to the router.

modelRouter.route('/').get(getLocalModels);
modelRouter.route('/running').get(getRunningModels);
modelRouter.route('/pull').post(pullModel);
modelRouter.route('/load').post(loadModel);
modelRouter.route('/unload').post(unloadModel);
modelRouter.route('/delete').delete(deleteModel);

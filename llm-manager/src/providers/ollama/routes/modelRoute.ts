import { Router } from 'express';
import { deleteModel, getLocalModels, getRunningModels, loadModel, pullModel, unloadModel } from '../controllers/modelController.js';

export const ollamaModelRouter = Router();

ollamaModelRouter.route('/').get(getLocalModels);
ollamaModelRouter.route('/running').get(getRunningModels);
ollamaModelRouter.route('/pull').post(pullModel);
ollamaModelRouter.route('/load').post(loadModel);
ollamaModelRouter.route('/unload').post(unloadModel);
ollamaModelRouter.route('/delete').delete(deleteModel);

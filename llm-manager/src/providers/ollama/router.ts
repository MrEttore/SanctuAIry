import { Router } from 'express';
import { chatCompletion } from './controllers/chatController.js';
import { validateBody } from '../../middlewares/validate.js';
import { ChatRequestSchema } from '../../schemas/chat.js';
import { deleteModel, getLocalModels, getRunningModels, loadModel, pullModel, unloadModel } from './controllers/modelController.js';

export const ollamaRouter = Router();

// Chat routes
ollamaRouter.post('/chat/completion', validateBody(ChatRequestSchema), chatCompletion);
// ollamaRouter.post('/completion/stream', validateBody(ChatRequestSchema), chatStream);

// Model routes
ollamaRouter.get('/models', getLocalModels);
ollamaRouter.get('/models/running', getRunningModels);
ollamaRouter.post('/models/pull', pullModel);
ollamaRouter.post('/models/load', loadModel);
ollamaRouter.post('/models/unload', unloadModel);
ollamaRouter.delete('/models/delete', deleteModel);

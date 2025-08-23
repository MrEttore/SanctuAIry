import { Router } from 'express';
import { chatCompletion } from '../controllers/chatController.js';
import { validateBody } from '../../../middlewares/validate.js';
import { ChatRequestSchema } from '../../../schemas/chat.js';

export const ollamaChatRouter = Router();

// ollamaChatRouter.post('/completion/stream', validateBody(ChatRequestSchema), chatStream);
ollamaChatRouter.post('/completion', validateBody(ChatRequestSchema), chatCompletion);

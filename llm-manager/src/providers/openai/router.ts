import { Router } from 'express';
import { chatCompletion } from './controllers/chatController.js';
import { validateBody } from '../../middlewares/validate.js';
import { ChatRequestSchema } from '../../schemas/chat.js';

export const openaiRouter = Router();

// Chat routes
openaiRouter.post('/chat/completion', validateBody(ChatRequestSchema), chatCompletion);

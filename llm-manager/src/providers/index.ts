import { Router } from 'express';
import { ollamaChatRouter } from './ollama/routes/chatRoute.js';
import { ollamaModelRouter } from './ollama/routes/modelRoute.js';
import { openaiChatRouter } from './openai/routes/chatRoute.js';

export const providersRouter = Router();

providersRouter.use('/ollama/chat', ollamaChatRouter);
providersRouter.use('/ollama/models', ollamaModelRouter);
providersRouter.use('/openai/chat', openaiChatRouter);

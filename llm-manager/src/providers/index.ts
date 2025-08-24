import { Router } from 'express';
import { ollamaRouter } from './ollama/router.js';
import { openaiRouter } from './openai/router.js';

export const providersRouter = Router();

providersRouter.use('/ollama', ollamaRouter);
providersRouter.use('/openai', openaiRouter);

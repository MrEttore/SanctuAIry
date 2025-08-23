import { Router } from 'express';
import { chatCompletion } from '../controllers/chatController.js';

export const openaiChatRouter = Router();

openaiChatRouter.route('/completion').post(chatCompletion);

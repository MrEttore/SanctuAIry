import express from 'express';
import { chatStream, chatNoStream } from '../controllers/chatController.js';

export const chatRouter = express.Router();

// Link controllers to the router.

chatRouter.route('/stream').post(chatStream);
chatRouter.route('/no-stream').post(chatNoStream);

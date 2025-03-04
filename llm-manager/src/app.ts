import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { modelRouter } from './routes/modelRoute.js';
import { chatRouter } from './routes/chatRoute.js';

export const app = express();

// Middlewares

// Comment out when done with testing in docker compose:
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('SanctuAIry is running');
});

// Mount routers

app.use('/api/v1/models', modelRouter);
app.use('/api/v1/chat', chatRouter);

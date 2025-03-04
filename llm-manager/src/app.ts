import { modelRouter } from './routes/modelRoute.js';
import express, { Request, Response } from 'express';
import morgan from 'morgan';

export const app = express();

// Middlewares

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('SanctuAIry is running');
});

// Mount routers

app.use('/api/v1/models', modelRouter);
// TODO: Add chat router

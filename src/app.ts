import { modelRouter } from '#routes/modelRoute.js';
import express, { Response } from 'express';
import morgan from 'morgan';

export const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (res: Response) => {
  res.json({ message: 'SanctuAIry is online.' });
});

// Mount routers

app.use('/api/v1/models', modelRouter);
// TODO: Add chat router

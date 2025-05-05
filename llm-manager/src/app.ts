import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { modelRouter } from './routes/modelRoute.js';
import { chatRouter } from './routes/chatRoute.js';
import { AppError } from './utils/AppError.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';

export const app = express();

// Middlewares

// Comment out when done with testing in docker compose:
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost'],
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Llm manager is running');
});

// Mount routers

app.use('/api/v1/models', modelRouter);
app.use('/api/v1/chat', chatRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { modelRouter } from './routes/modelRoute.js';
import { chatRouter } from './routes/chatRoute.js';
import { AppError } from './utils/AppError.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { corsBasic, corsPreflight } from './config/cors.js';

export const app = express();

// TODO: fake todo

// Middlewares

app.use(corsBasic);
app.options('*', corsPreflight);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️ Llm manager is running');
});

// Mount routers

app.use('/api/v1/models', modelRouter);
app.use('/api/v1/chat', chatRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { modelRouter } from './routes/modelRoute.js';
import { chatRouter } from './routes/chatRoute.js';
import { AppError } from './utils/AppError.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';

export const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
console.info(`Frontend URL: ${frontendUrl}`);

// Middlewares

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));

app.use(express.json());

app.use(
  cors({
    origin: [frontendUrl, 'http://localhost', 'https://sanctuairy.netlify.app'],
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

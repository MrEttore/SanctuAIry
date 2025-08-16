import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import { modelRouter } from './routes/modelRoute.js';
import { chatRouter } from './routes/chatRoute.js';
import { AppError } from './utils/AppError.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';

export const app = express();
const allowlist = new Set(['https://sanctuairy.netlify.app', 'http://localhost:5173']);

// CORS configuration
const corsOptions: CorsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowlist.has(origin)) return cb(null, true);
    console.warn('CORS blocked origin:', origin);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: false,
};

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://sanctuairy.netlify.app'],
  }),
);

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

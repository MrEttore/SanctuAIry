import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let error = err instanceof AppError ? err : new AppError((err as Error)?.message || 'Something when wrong', 500);

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

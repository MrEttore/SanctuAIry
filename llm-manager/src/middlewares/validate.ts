import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).type('application/problem+json').json({
        type: 'https://example.com/problems/validation-error',
        title: 'Invalid request body',
        status: 400,
        detail: parsed.error.format(),
      });
      return;
    }
    req.body = parsed.data;
    next();
  };
};

import { z } from 'zod';

export const ProblemDetailsSchema = z
  .object({
    type: z.string().url().or(z.literal('about:blank')).default('about:blank'),
    title: z.string(),
    status: z.number().int(),
    detail: z.unknown().optional(),
    instance: z.string().optional(),
  })
  .strict();

export type ProblemDetails = z.infer<typeof ProblemDetailsSchema>;

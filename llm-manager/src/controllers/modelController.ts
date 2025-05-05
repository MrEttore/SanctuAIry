import { NextFunction, Request } from 'express';
import { DeleteRequest, GenerateRequest, GenerateResponse, ListResponse, ProgressResponse, PullRequest, StatusResponse } from 'ollama';
import { ollama } from '../ollama.js';
import { TypedRequest } from '../types/requestTypes.js';
import { TypedResponse } from '../types/responseTypes.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

/**
 * GET /api/v1/models
 *
 * Returns a list of locally‐available models from the llm-core.
 */
export const getLocalModels = catchAsync(async (req: TypedRequest<unknown>, res: TypedResponse<ListResponse>) => {
  const response = await ollama.list();

  res.status(200).json({ status: 'success', data: response });
});

/**
 * GET /api/v1/models/running
 *
 * Returns a list of running models from the llm-core.
 */
export const getRunningModels = catchAsync(async (req: TypedRequest<unknown>, res: TypedResponse<ListResponse>) => {
  const response = await ollama.ps();

  res.status(200).json({ status: 'success', data: response });
});

/**
 * GET ...
 *
 * Returns ...
 */
export const pullModel = catchAsync(async (req: TypedRequest<PullRequest>, res: TypedResponse<ProgressResponse>, next: NextFunction) => {
  const { model, insecure } = req.body;

  if (!model) return next(new AppError('A model is required.', 400));

  const response = await ollama.pull({ model, insecure });

  res.status(200).json({ status: 'success', data: response });
});

/**
 * GET ...
 *
 * Returns ...
 */
export const loadModel = catchAsync(async (req: TypedRequest<GenerateRequest>, res: TypedResponse<GenerateResponse>, next: NextFunction) => {
  const { model, prompt = '' } = req.body;

  if (!model) return next(new AppError('A model is required.', 400));

  const response = await ollama.generate({ model, prompt });

  res.status(200).json({ status: 'success', data: response });
});

/**
 * GET ...
 *
 * Returns ...
 */
export const unloadModel = catchAsync(async (req: TypedRequest<GenerateRequest>, res: TypedResponse<GenerateResponse>, next: NextFunction) => {
  const { model, prompt = '', keep_alive = 0 } = req.body;

  if (!model) return next(new AppError('A model is required.', 400));

  const response = await ollama.generate({ model, prompt, keep_alive });

  res.status(200).json({ status: 'success', data: response });
});

/**
 * GET ...
 *
 * Returns ...
 */
export const deleteModel = catchAsync(async (req: TypedRequest<DeleteRequest>, res: TypedResponse<StatusResponse>, next: NextFunction) => {
  const { model } = req.body;

  if (!model) return next(new AppError('A model is required.', 400));

  const response = await ollama.delete({ model });

  res.status(200).json({ status: 'success', data: response });
});

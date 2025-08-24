import { Request, Response } from 'express';
import { ollama } from '../client.js';

/**
 * GET /api/v1/models
 *
 * Returns a list of locally‐available models from the llm-core.
 */
export const getLocalModels = async (req: Request, res: Response) => {
  const response = await ollama.list();

  res.status(200).json(response);
};

/**
 * GET /api/v1/models/running
 *
 * Returns a list of running models from the llm-core.
 */
export const getRunningModels = async (req: Request, res: Response) => {
  const response = await ollama.ps();

  res.status(200).json(response);
};

/**
 * GET ...
 *
 * Returns ...
 */
export const pullModel = async (req: Request, res: Response) => {
  const { model, insecure } = req.body;

  const response = await ollama.pull({ model, insecure });

  res.status(200).json(response);
};

/**
 * GET ...
 *
 * Returns ...
 */
export const loadModel = async (req: Request, res: Response) => {
  const { model, prompt = '' } = req.body;

  const response = await ollama.generate({ model, prompt });

  res.status(200).json(response);
};

/**
 * GET ...
 *
 * Returns ...
 */
export const unloadModel = async (req: Request, res: Response) => {
  const { model, prompt = '', keep_alive = 0 } = req.body;

  const response = await ollama.generate({ model, prompt, keep_alive });

  res.status(200).json(response);
};

/**
 * GET ...
 *
 * Returns ...
 */
export const deleteModel = async (req: Request, res: Response) => {
  const { model } = req.body;

  const response = await ollama.delete({ model });

  res.status(200).json(response);
};

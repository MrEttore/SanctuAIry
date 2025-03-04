import { Request } from 'express';
import { DeleteRequest, GenerateRequest, GenerateResponse, ListResponse, ProgressResponse, PullRequest, StatusResponse } from 'ollama';
import { ollama } from '../ollama.js';
import { TypedRequestBody } from '../types/requestTypes.js';
import { TypedResponse } from '../types/responseTypes.js';

// Controllers:

export const getLocalModels = async (req: Request, res: TypedResponse<ListResponse>) => {
  try {
    const response = await ollama.list();

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

export const getRunningModels = async (req: Request, res: TypedResponse<ListResponse>) => {
  try {
    const response = await ollama.ps();

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

export const pullModel = async (req: TypedRequestBody<PullRequest>, res: TypedResponse<ProgressResponse>) => {
  try {
    const { model, insecure } = req.body;

    if (!model) {
      res.status(400).json({ status: 'fail', message: 'A model is required.' });
      return;
    }

    const response = await ollama.pull({ model, insecure });

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

export const loadModel = async (req: TypedRequestBody<GenerateRequest>, res: TypedResponse<GenerateResponse>) => {
  try {
    const { model, prompt = '' } = req.body;

    if (!model) {
      res.status(400).json({ status: 'fail', message: 'A model is required.' });
      return;
    }

    const response = await ollama.generate({ model, prompt });

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage, code: 500 });
  }
};

export const unloadModel = async (req: TypedRequestBody<GenerateRequest>, res: TypedResponse<GenerateResponse>) => {
  try {
    const { model, prompt = '', keep_alive = 0 } = req.body;

    if (!model) {
      res.status(400).json({ status: 'fail', message: 'A model is required.' });
      return;
    }

    const response = await ollama.generate({ model, prompt, keep_alive });

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

export const deleteModel = async (req: TypedRequestBody<DeleteRequest>, res: TypedResponse<StatusResponse>) => {
  try {
    const { model } = req.body;

    if (!model) {
      res.status(400).json({ status: 'fail', message: 'A model is required.' });
      return;
    }

    const response = await ollama.delete({ model });

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

// TODO: createModel (with custom Modelfile)

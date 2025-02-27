import { Request, Response } from 'express';
import { ollama } from '#ollama.js';

// Model controllers

export const getLocalModels = async (req: Request, res: Response) => {
  try {
    const response = await ollama.list();
    const { models } = response;

    res.status(200).json({ status: 'success', data: { models } });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

export const getRunningModels = async (req: Request, res: Response) => {
  try {
    const response = await ollama.ps();
    const { models } = response;

    res.status(200).json({ status: 'success', data: { models } });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

export const pullModel = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    // TODO: Add validate body middleware.
    // if (!('model' in req.body)) return;

    const response = await ollama.pull({ model: 'llama3.2', insecure: false, stream: false });
    const { status } = response;

    res.status(200).json({ status });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

// TODO: loadModel

// TODO: createModel (with custom Modelfile)

import { AbortableAsyncIterator, ChatRequest, ChatResponse } from 'ollama';
import { ollama } from '../ollama.js';
import { TypedRequest } from '../types/requestTypes.js';
import { TypedResponse } from '../types/responseTypes.js';

// Controllers:

export const chatStream = async (req: TypedRequest<ChatRequest>, res: TypedResponse<AbortableAsyncIterator<ChatResponse>>) => {
  const { model, messages } = req.body;

  try {
    const response = await ollama.chat({ model, messages, stream: true });

    res.setHeader('Content-Type', 'application/x-ndjson');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const part of response) {
      const jsonLine = JSON.stringify(part);
      console.log('jsonLine: ', jsonLine);
      res.write(jsonLine + '\n');
    }

    res.end();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.write(JSON.stringify({ error: errorMessage }) + '\n');
    res.end();
  }
};

export const chatNoStream = async (req: TypedRequest<ChatRequest>, res: TypedResponse<ChatResponse>) => {
  const { model, messages } = req.body;

  try {
    const response = await ollama.chat({ model, messages, stream: false });

    res.status(200).json({ status: 'success', data: response });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    res.status(500).json({ status: 'error', message: errorMessage });
  }
};

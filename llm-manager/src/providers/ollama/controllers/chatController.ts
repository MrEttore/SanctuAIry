import { ollama } from '../client.js';
import { Request, Response } from 'express';
import { ApiChatRequest, ApiChatResponse } from '../../../schemas/chat.js';
import { ProblemDetails } from '../../../schemas/errors.js';

// TODO: Refactor
// export const chatCompletionStream = async (req: TypedRequest<ChatRequest>, res: TypedResponse<AbortableAsyncIterator<ChatResponse>>) => {
//   const { model, messages } = req.body;

//   try {
//     const response = await ollama.chat({ model, messages, stream: true });

//     res.setHeader('Content-Type', 'application/x-ndjson');
//     res.setHeader('Transfer-Encoding', 'chunked');

//     for await (const part of response) {
//       const jsonLine = JSON.stringify(part);
//       console.log('jsonLine: ', jsonLine);
//       res.write(jsonLine + '\n');
//     }

//     res.end();
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
//     res.write(JSON.stringify({ error: errorMessage }) + '\n');
//     res.end();
//   }
// };

export const chatCompletion = async (req: Request<any, any, ApiChatRequest>, res: Response<ApiChatResponse | ProblemDetails>) => {
  const { model, messages } = req.body;

  try {
    const completion = await ollama.chat({ model, messages, stream: false });

    const result: ApiChatResponse = {
      provider: 'ollama',
      model: completion.model,
      message: completion.message as ApiChatResponse['message'],
      finishReason: completion.done_reason,
    };

    res.status(200).json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown Error';

    res
      .status(502)
      .type('application/problem+json')
      .json({
        type: 'https://example.com/problems/provider-error',
        title: 'Ollama error',
        status: 502,
        detail: { message: message ?? 'Unknown error' },
      });
  }
};

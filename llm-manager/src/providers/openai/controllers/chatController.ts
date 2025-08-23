import { ApiChatRequest, ApiChatResponse } from '../../../schemas/chat.js';
import { ProblemDetails } from '../../../schemas/errors.js';
import { openai } from '../client.js';
import { Request, Response } from 'express';

export const chatCompletion = async (req: Request<any, any, ApiChatRequest>, res: Response<ApiChatResponse | ProblemDetails>) => {
  const { model, messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    const response: ApiChatResponse = {
      provider: 'openai',
      model: completion.model,
      message: completion.choices[0].message as ApiChatResponse['message'],
      finishReason: completion.choices[0].finish_reason,
      usage: completion.usage as ApiChatResponse['usage'],
    };

    res.status(200).json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown Error';

    res
      .status(502)
      .type('application/problem+json')
      .json({
        type: 'https://example.com/problems/provider-error',
        title: 'OpenAI error',
        status: 502,
        detail: { message: message ?? 'Unknown error' },
      });
  }
};

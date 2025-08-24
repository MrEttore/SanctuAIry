import { z } from 'zod';

// Request
export const RoleSchema = z.enum(['system', 'user', 'assistant']);
export const MessageSchema = z.object({
  role: RoleSchema,
  content: z.string(),
});
export const ChatRequestSchema = z.object({
  model: z.string(),
  messages: z.array(MessageSchema),
  stream: z.boolean().optional(),
});

// Response
export const ProviderSchema = z.enum(['ollama', 'openai']);
export const UsageSchema = z
  .object({
    promptTokens: z.number().int().nonnegative().optional(),
    completionTokens: z.number().int().nonnegative().optional(),
    totalTokens: z.number().int().nonnegative().optional(),
  })
  .strict();
export const ChatResponseSchema = z.object({
  provider: ProviderSchema,
  model: z.string(),
  // created: z.number(),
  message: z.string().nullable(),
  finishReason: z.string().optional(),
  usage: UsageSchema.optional(),
});

// Types
export type Role = z.infer<typeof RoleSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type ApiChatRequest = z.infer<typeof ChatRequestSchema>;

export type Provider = z.infer<typeof ProviderSchema>;
export type Usage = z.infer<typeof UsageSchema>;
export type ApiChatResponse = z.infer<typeof ChatResponseSchema>;

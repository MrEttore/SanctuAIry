import { Ollama } from 'ollama';

export const ollama = new Ollama({ host: process.env.LLM_CORE_URL ?? 'http://localhost:11434' });

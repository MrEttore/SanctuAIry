import { Model } from './llm';

export type Chat = {
    currentPrompt: string | null;
    messages: string[];
    model: Model | null;
};

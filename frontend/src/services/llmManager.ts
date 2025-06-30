import axios from 'axios';

import { Model } from '../types/llm';

const LLM_MANAGER_URL = import.meta.env.VITE_LLM_MANAGER_URL;
console.info(`LLM_MANAGER_URL: ${LLM_MANAGER_URL}`);

// TODO: Refactor using Axios (Also catches network errors, e.g., connection refused when llm-manager is down).

/**
 * Gets the available models from the llm-core service.
 */
export async function getModels(): Promise<Model[]> {
    try {
        const { data } = await axios.get(`${LLM_MANAGER_URL}/api/v1/models`, {
            timeout: 5000,
        });

        const localModels: Model[] = data.data.models;
        return localModels;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.status === 500)
            throw new Error('SanctuAIry core not available.');
        if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK')
            throw new Error("SanctuAIry's model service not available.");
        throw new Error('An unexpected error occurred.');
    }
}

type sendPromptNoStreamPayload = {
    prompt: string;
    model: string;
};

export async function sendPromptNoStream({
    prompt,
    model,
}: sendPromptNoStreamPayload) {
    try {
        const { data } = await axios.post(
            `${LLM_MANAGER_URL}/api/v1/chat/no-stream`,
            {
                model,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            },
        );

        const response = data.data.message.content;
        return response;
    } catch (error: unknown) {
        console.error(error); // TODO: Handle errors properly.
    }
}

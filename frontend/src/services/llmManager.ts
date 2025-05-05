const LLM_MANAGER_URL = import.meta.env.VITE_LLM_MANAGER_URL;

// TODO: Refactor using Axios.

/**
 * Gets the available models from the llm-core service.
 */
export async function getModels() {
    const response = await fetch(`${LLM_MANAGER_URL}/api/v1/models`);
    const payload = await response.json();

    if (!response.ok) {
        const message = `Error loading available models. Llm core service not available.`;
        throw new Error(message);
    }

    return payload;
}

type sendPromptNoStreamPayload = {
    prompt: string;
    model: string;
};

export async function sendPromptNoStream({
    prompt,
    model,
}: sendPromptNoStreamPayload) {
    const response = await fetch(`${LLM_MANAGER_URL}/api/v1/chat/no-stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    });
    const payload = await response.json();

    if (!response.ok) {
        const message = `Error sending the prompt to the llm core service.`;
        throw new Error(message);
    }

    return payload;
}

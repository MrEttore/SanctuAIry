const LLM_MANAGER_URL = import.meta.env.VITE_LLM_MANAGER_URL;

// TODO: Refactor using Axios.
// TODO: Add error handling.

// Gets the available models from the llm-core
export async function getModels() {
    try {
        const response = await fetch(`${LLM_MANAGER_URL}/api/v1/models`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        return data;
    } catch (error: unknown) {
        console.error(error);
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
        const response = await fetch(
            `${LLM_MANAGER_URL}/api/v1/chat/no-stream`,
            {
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
            },
        );

        const data = await response.json();

        return data;
    } catch (error: unknown) {
        console.log(error);
    }
}

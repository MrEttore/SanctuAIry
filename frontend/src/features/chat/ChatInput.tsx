import { useMutation } from '@tanstack/react-query';
import { LoaderCircle, SendHorizontal } from 'lucide-react';
import { useState } from 'react';

import { sendPromptNoStream } from '../../services/llmManager';

export function ChatInput() {
    const [prompt, setPrompt] = useState('');
    const model = 'sanctuairy-model:latest';
    const { isPending, isSuccess, isError, data, error, mutate } = useMutation({
        mutationKey: ['prompt-no-stream'],
        mutationFn: sendPromptNoStream,
        onSuccess: (response) => {
            console.log(response);
        },
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate({ prompt, model });
    }

    return (
        <div className="px-4">
            <form
                className="mx-auto my-4 flex max-w-5xl items-center rounded-3xl bg-teal-900/40 px-1 py-4 transition-all duration-300 focus-within:-translate-y-1"
                onSubmit={handleSubmit}
            >
                <textarea
                    className="scrollbar scrollbar-thumb-[#ffdcc6]/50 scrollbar-track-teal-900 focus:scrollbar-track-teal-950 flex-1 resize-none overflow-scroll overflow-x-hidden overflow-y-auto p-4 text-teal-50 placeholder:text-base focus:outline-none"
                    rows={1}
                    placeholder="Ask me something ..."
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                    }}
                />
                <button
                    className={`focus-within:scrollbar-track-teal-900 focus:outline-none" type="submit mr-4 cursor-pointer rounded-full p-3 text-teal-50 transition-all duration-300 hover:bg-teal-900 focus:outline-none ${isPending ? 'cursor-progress' : ''}`}
                    disabled={isPending}
                >
                    {isPending ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <SendHorizontal size={25} />
                    )}
                </button>
            </form>
        </div>
    );
}

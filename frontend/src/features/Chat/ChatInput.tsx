import { SendHorizontal } from 'lucide-react';
import { useState } from 'react';

export function ChatInput() {
    const [input, setInput] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className="px-4">
            <form
                className="mx-auto my-4 flex max-w-5xl items-center rounded-3xl bg-teal-900 px-1 py-4 shadow-md shadow-teal-900/50 transition-all duration-300 focus-within:-translate-y-1"
                onSubmit={handleSubmit}
            >
                <textarea
                    className="scrollbar scrollbar-thumb-[#ffdcc6]/50 scrollbar-track-teal-900 focus:scrollbar-track-teal-950 flex-1 resize-none overflow-scroll overflow-x-hidden overflow-y-auto p-4 text-teal-50 placeholder:text-base focus:outline-none"
                    rows={1}
                    placeholder="Ask me something ..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <button className="focus-within:scrollbar-track-teal-900 mr-4 cursor-pointer rounded-full p-3 text-teal-50 transition-all duration-300 hover:bg-teal-700 focus:ring-2 focus:outline-none">
                    <SendHorizontal size={25} />
                </button>
            </form>
        </div>
    );
}

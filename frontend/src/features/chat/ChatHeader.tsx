import { LlmSelector } from '../llm';

export function ChatHeader() {
    return (
        <header className="flex min-h-10 bg-teal-900/40 p-3 shadow-xs">
            <LlmSelector />
        </header>
    );
}

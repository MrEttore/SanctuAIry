import { LlmSelector } from '../Llm';
import { models } from '../../dev-data/models';

export function ChatHeader() {
    return (
        <header className="flex h-1/12 bg-teal-900 p-3">
            <LlmSelector options={models} />
        </header>
    );
}

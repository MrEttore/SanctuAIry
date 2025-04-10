import { LlmSelector } from '../Llm/LlmSelector';
import { models } from '../../dev-data/models';

export default function ChatHeader() {
    return (
        <header className="flex bg-teal-900 p-3">
            <LlmSelector options={models} />
        </header>
    );
}

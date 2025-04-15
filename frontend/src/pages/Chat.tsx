import { ChatHeader, ChatMessages, ChatInput } from '../features/Chat';

export function Chat() {
    return (
        <main className="flex w-full flex-col bg-teal-50">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </main>
    );
}

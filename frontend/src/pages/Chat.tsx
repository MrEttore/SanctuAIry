import { ChatHeader, ChatMessages, ChatInput } from '../features/chat';

export function Chat() {
    return (
        <main className="flex flex-1 flex-col bg-gradient-to-r from-teal-950 from-2% to-slate-800 to-95%">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </main>
    );
}

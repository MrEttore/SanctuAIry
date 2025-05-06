import { ChatHeader, ChatInput, ChatMessages } from '.';

export function ChatPage() {
    return (
        <main className="flex flex-1 flex-col bg-gradient-to-r from-teal-950 from-2% to-slate-800 to-95%">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </main>
    );
}

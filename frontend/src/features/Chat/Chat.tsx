import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

export function Chat() {
  return (
    <main className="flex w-full flex-col bg-teal-50">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </main>
  );
}

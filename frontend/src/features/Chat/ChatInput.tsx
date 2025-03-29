import { SendHorizontal } from 'lucide-react';

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

export default function ChatInput() {
  return (
    <div>
      <form
        className="mx-8 my-4 flex items-center rounded-3xl bg-teal-900 px-1 py-4 transition-all duration-300 focus-within:-translate-y-1"
        onSubmit={handleSubmit}
      >
        <textarea
          className="scrollbar scrollbar-thumb-[#ffdcc6]/50 scrollbar-track-teal-900 flex-1 resize-none overflow-scroll overflow-x-hidden overflow-y-auto p-4 text-teal-50 placeholder:text-base focus:outline-none"
          rows={1}
          placeholder="Ask me something ..."
        />
        <button className="mr-4 cursor-pointer rounded-full p-3 text-teal-50 transition-all duration-300 hover:bg-teal-700">
          <SendHorizontal size={25} />
        </button>
      </form>
    </div>
  );
}

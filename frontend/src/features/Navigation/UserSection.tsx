import { MoreVertical } from 'lucide-react';

export function UserSection() {
  return (
    <div className="flex border-t-3 border-[#ffdcc6] p-4">
      <img
        className="mr-4 h-20 w-20 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 hover:border-2 hover:border-teal-50"
        src="https://avatar.iran.liara.run/public/4"
        alt=""
      />

      <div className="flex flex-1 items-center justify-between text-teal-50">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold uppercase">John Doe</span>
          <span className="text-lg font-medium">john.doe@gmail.com</span>
        </div>
        <button
          className="cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-teal-900"
          onClick={() => {
            console.log('Click!');
          }}
        >
          <MoreVertical size={30} />
        </button>
      </div>
    </div>
  );
}

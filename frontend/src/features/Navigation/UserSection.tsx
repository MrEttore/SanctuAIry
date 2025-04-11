import { MoreVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function UserSection() {
    const { username, email, profilePicture } = useSelector(
        (state: RootState) => state.user,
    );

    return (
        <div className="flex border-t-3 border-[#ffdcc6] p-4">
            <img
                className="mr-4 h-20 w-20 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 hover:border-2 hover:border-teal-50"
                src={profilePicture}
                alt=""
            />

            <div className="flex flex-1 items-center justify-between text-teal-50">
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold uppercase">
                        {username}
                    </span>
                    <span className="text-lg font-medium">{email}</span>
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

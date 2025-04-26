import { useSelector } from 'react-redux';
import { MoreVertical } from 'lucide-react';
import { RootState } from '../../redux/store';
import { ProfilePicture } from '../../ui';

export function UserSummary() {
    const { username, email } = useSelector((state: RootState) => state.user);

    return (
        <div className="m-2 flex rounded-3xl bg-teal-900/40 p-4">
            <ProfilePicture />
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

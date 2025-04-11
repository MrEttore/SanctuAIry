import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoaderCircle } from 'lucide-react';
import { RootState } from '../redux/store';

export function ProfilePicture() {
    const profilePicture = useSelector(
        (state: RootState) => state.user.profilePicture,
    );
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <div className="relative mr-4 h-20 w-20">
            {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoaderCircle
                        size={30}
                        className="animate-spin text-teal-50"
                    />
                </div>
            )}
            <img
                className={`h-20 w-20 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 hover:border-teal-50 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                src={profilePicture}
                alt=""
            />
        </div>
    );
}

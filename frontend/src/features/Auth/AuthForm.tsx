import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';

import { AppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';
import { AuthInput } from './AuthInput';
import { User } from '../../types/user';

type Props = {
    loginAsGuest: boolean;
};

export function AuthForm({ loginAsGuest }: Props) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nameGuest, setNameGuest] = useState<string>('');
    const [error, setError] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!loginAsGuest) {
            setError(
                'Login currently not available. Access as guest to use the app.',
            );
            return;
        }

        if (!nameGuest) {
            setError('Please enter a name');
            return;
        }

        const guestUser: User = {
            username: nameGuest,
            email: `${nameGuest}@sanctuairy.com`,
            profilePicture: 'https://avatar.iran.liara.run/public',
        };

        dispatch(setUser(guestUser));
        navigate('/chat');
    }

    return (
        <div className="mt-8">
            <form
                className="flex flex-col items-center space-y-4"
                onSubmit={handleSubmit}
            >
                {loginAsGuest ? (
                    <AuthInput
                        label="name"
                        type="text"
                        placeholder="Enter your name"
                        value={nameGuest}
                        setValue={setNameGuest}
                    />
                ) : (
                    <>
                        <AuthInput
                            label="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            setValue={setEmail}
                        />

                        <AuthInput
                            label="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            setValue={setPassword}
                        />
                    </>
                )}

                {error && (
                    <p className="animate-fade-in flex items-center gap-2 rounded-xl border-2 border-orange-400 bg-orange-300 p-2 text-center text-sm text-orange-950">
                        <TriangleAlert />
                        {error}
                    </p>
                )}

                <button className="mt-4 w-1/4 cursor-pointer rounded-xl bg-teal-900 p-4 text-teal-50 shadow-xl transition-all duration-300 hover:bg-teal-800 hover:ring-1 hover:ring-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                    {loginAsGuest ? 'Get started' : 'Login'}
                </button>
            </form>
        </div>
    );
}

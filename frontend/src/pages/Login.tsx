import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { setUser } from '../redux/slices/userSlice';
import { Logo } from '../ui';
import { InputAuth } from '../features/Auth/InputAuth';
import { TriangleAlert } from 'lucide-react';

export function Login() {
    const [loginAsGuest, setLoginAsGuest] = useState<boolean>(false);
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
        <div className="flex w-full flex-col bg-linear-to-bl from-teal-900 to-green-800">
            <div className="flex h-1/4 items-center justify-center">
                <Logo />
            </div>

            {/* LOGIN */}
            <div className="flex justify-center">
                <div className="flex w-1/3 flex-col rounded-4xl bg-teal-50 p-4 shadow-2xl">
                    <div className="mb-4">
                        <p className="my-4 text-center text-4xl font-medium text-teal-950">
                            Login
                        </p>
                    </div>

                    <div className="flex justify-center gap-6">
                        <label className="text-lg text-teal-950">
                            Login as guest
                        </label>
                        <input
                            type="checkbox"
                            checked={loginAsGuest}
                            onChange={() => {
                                setLoginAsGuest(!loginAsGuest);
                            }}
                            className="w-5 cursor-pointer"
                        />
                    </div>

                    <div className="mt-8">
                        <form
                            className="flex flex-col items-center space-y-4"
                            onSubmit={handleSubmit}
                        >
                            {loginAsGuest ? (
                                <InputAuth
                                    label="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={nameGuest}
                                    setValue={setNameGuest}
                                />
                            ) : (
                                <>
                                    <InputAuth
                                        label="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        setValue={setEmail}
                                    />

                                    <InputAuth
                                        label="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        setValue={setPassword}
                                    />
                                </>
                            )}

                            {error && (
                                <p className="flex items-center gap-2 rounded-xl border-2 border-orange-400 bg-orange-300 p-2 text-center text-sm text-orange-950">
                                    <TriangleAlert />
                                    {error}
                                </p>
                            )}

                            <button className="mt-4 w-1/4 cursor-pointer rounded-xl bg-teal-900 p-4 text-teal-50 shadow-xl transition-all duration-300 hover:bg-teal-800 hover:ring-1 hover:ring-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                                {loginAsGuest ? 'Get started' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

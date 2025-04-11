import { useState } from 'react';

import { AuthLayout } from '../features/Auth/AuthLayout';
import { AuthForm } from '../features/Auth/AuthForm';
import { AuthToggle } from '../features/Auth/AuthToggle';

export function Auth() {
    const [loginAsGuest, setLoginAsGuest] = useState<boolean>(false);

    return (
        <AuthLayout title="Login">
            <AuthToggle
                checked={loginAsGuest}
                handleChecked={setLoginAsGuest}
            />
            <AuthForm loginAsGuest={loginAsGuest} />
        </AuthLayout>
    );
}

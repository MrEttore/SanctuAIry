import { useState } from 'react';

import { AuthForm, AuthLayout, AuthToggle } from '../features/auth';

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

import { useState } from 'react';

import { AuthForm, AuthLayout, AuthToggle } from '.';

export function AuthPage() {
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

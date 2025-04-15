import { useState } from 'react';

import { AuthLayout, AuthForm, AuthToggle } from '../features/Auth';

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

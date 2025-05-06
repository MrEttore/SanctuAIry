import { Navigate, Route, Routes } from 'react-router-dom';

import { AttestationPage } from './features/attestation';
import { AuthPage } from './features/auth';
import { ChatPage } from './features/chat';
import { UserPage } from './features/user';
import { AppLayout, OverviewPage } from './ui';

export function App() {
    return (
        <div className="font-quicksand flex h-full w-full">
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<AuthPage />} />

                {/* TODO: Add <ProtectedRoute/> */}
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<OverviewPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="attestation" element={<AttestationPage />} />
                </Route>
            </Routes>
        </div>
    );
}

import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout, Chat, User, Auth, Attestation, Overview } from './pages';

export function App() {
    return (
        <div className="font-quicksand flex h-full w-full">
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Auth />} />

                {/* TODO: Add <ProtectedRoute/> */}
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="user" element={<User />} />
                    <Route path="attestation" element={<Attestation />} />
                </Route>
            </Routes>
        </div>
    );
}

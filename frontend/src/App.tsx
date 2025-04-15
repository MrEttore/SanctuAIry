import { Route, Routes } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';

import { AppLayout, Chat, User, Auth } from './pages';

export function App() {
    return (
        <div className="font-quicksand flex h-full w-full">
            <Routes>
                <Route path="/login" element={<Auth />} />

                {/* TODO: Add <ProtectedRoute/> */}
                <Route path="/app" element={<AppLayout />}>
                    <Route path="chat" element={<Chat />} />
                    <Route path="user" element={<User />} />
                </Route>
            </Routes>
        </div>
    );
}

import { Route, Routes } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';

import { AppLayout, Chat, User, Auth } from './pages';

export function App() {
    return (
        <div className="font-quicksand flex h-full w-full">
            <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/chat" element={<Main />} />
            </Routes>
        </div>
    );
}

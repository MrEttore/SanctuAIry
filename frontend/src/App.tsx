import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Main } from './pages/Main';

export function App() {
    return (
        <div className="font-quicksand flex h-full w-full">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Main />} />
            </Routes>
        </div>
    );
}

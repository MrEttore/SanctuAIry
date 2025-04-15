import { Outlet } from 'react-router-dom';

import { Navigation } from '../features/Navigation';

export function AppLayout() {
    return (
        <div className="flex w-full">
            <Navigation />
            <Outlet />
        </div>
    );
}

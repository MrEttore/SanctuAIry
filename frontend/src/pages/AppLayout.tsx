import { Outlet } from 'react-router-dom';

import { Navigation } from '../features/navigation';

export function AppLayout() {
    return (
        <div className="flex w-full">
            <Navigation />
            <Outlet />
        </div>
    );
}

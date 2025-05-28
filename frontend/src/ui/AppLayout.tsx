import { Outlet } from 'react-router-dom';

import { Navigation } from '../features/navigation';

export function AppLayout() {
    return (
        <div className="flex w-full divide-x-2 divide-teal-800/20">
            <Navigation />
            <Outlet />
        </div>
    );
}

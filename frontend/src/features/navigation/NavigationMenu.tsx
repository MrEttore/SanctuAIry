import { NavigationMenuItem } from './NavigationMenuItem';
import { navigationItems } from '../../config/navigation';

export function NavigationMenu() {
    return (
        <nav className="flex flex-1 flex-col px-4 py-4">
            <ul className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                    <NavigationMenuItem
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                        to={item.to}
                    />
                ))}
            </ul>
        </nav>
    );
}

import { Logo } from '../../ui';
import { UserSection } from './UserSection';
import { NavigationMenu } from './NavigationMenu';

export function Navigation() {
    return (
        <aside className="flex shrink-0 flex-col bg-teal-950">
            <Logo furtherStyles="pr-4" />
            <NavigationMenu />
            <UserSection />
        </aside>
    );
}

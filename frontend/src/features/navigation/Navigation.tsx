import { Logo } from '../../ui';
import { NavigationMenu } from './NavigationMenu';
import { UserSummary } from '../user';

export function Navigation() {
    return (
        <aside className="flex shrink-0 flex-col bg-teal-950">
            <Logo furtherStyles="pr-4" linkTo="/app" />
            <NavigationMenu />
            <UserSummary />
        </aside>
    );
}

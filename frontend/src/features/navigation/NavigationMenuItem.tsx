import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    icon: JSX.ElementType;
    name: string;
    to: string;
};

export function NavigationMenuItem({ icon: Icon, name, to }: Props) {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex cursor-pointer rounded-lg px-4 py-2 transition-all duration-300 ${isActive ? 'bg-teal-50 font-bold text-teal-900' : 'bg-teal-900 font-medium text-teal-50 hover:bg-teal-800'}`
                }
            >
                <Icon />
                <span className="ml-3 text-lg">{name}</span>
            </NavLink>
        </li>
    );
}

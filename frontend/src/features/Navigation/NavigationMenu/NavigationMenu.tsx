import { Settings, SearchCheck } from 'lucide-react';
import { NavigationMenuItem } from '../NavigationMenuItem/NavigationMenuItem';
import './NavigationMenu.scss';

const elements = [
  { icon: <SearchCheck />, text: 'Attestation', active: false },
  { icon: <Settings />, text: 'Settings', active: false },
];

export function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu-items">
        {elements.map((element) => (
          <NavigationMenuItem
            key={element.text}
            icon={element.icon}
            text={element.text}
            active={element.active}
          />
        ))}
      </ul>
    </nav>
  );
}

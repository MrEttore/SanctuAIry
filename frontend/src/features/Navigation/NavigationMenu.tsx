import { Settings, SearchCheck } from 'lucide-react';
import { NavigationMenuItem } from './NavigationMenuItem';

const elements = [
  { icon: <SearchCheck />, text: 'Attestation', active: false },
  { icon: <Settings />, text: 'Settings', active: false },
];

export function NavigationMenu() {
  return (
    <nav className="flex h-full flex-col px-4 py-4">
      <ul className="flex flex-1 flex-col justify-end gap-4">
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

import { JSX } from 'react';

type Props = {
  icon: JSX.Element;
  text: string;
  active?: boolean;
};

export function NavigationMenuItem({ icon, text, active }: Props) {
  return (
    <li
      className={`duration-300n flex cursor-pointer rounded-lg bg-teal-800 px-4 py-2 font-medium text-teal-50 transition-all hover:bg-teal-900 ${active ? 'bg-teal-900' : ''}`}
    >
      {icon}
      <span className="ml-3 text-lg">{text}</span>
    </li>
  );
}

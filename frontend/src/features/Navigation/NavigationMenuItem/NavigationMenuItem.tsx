import { JSX } from "react";
import "./NavigationMenuItem.scss";

type Props = {
  icon: JSX.Element;
  text: string;
  active?: boolean;
};

export function NavigationMenuItem({ icon, text, active }: Props) {
  return (
    <li className={`navigation-menu-item ${active ? "active" : ""}`}>
      {icon}
      <span className="type">{text}</span>
    </li>
  );
}

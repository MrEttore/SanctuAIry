import { Logo } from "../../ui";
import { UserSection } from "./UserSection/UserSection";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import "./Navigation.scss";

export function Navigation() {
  return (
    <aside className="navigation">
      <Logo />
      <NavigationMenu />
      <UserSection />
    </aside>
  );
}

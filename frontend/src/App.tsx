import { Navigation } from "./features/Navigation/Navigation";
import { Chat } from "./features/Chat/Chat";
import "./styles/index.scss";

export function App() {
  return (
    <div className="app">
      <Navigation />
      <Chat />
    </div>
  );
}

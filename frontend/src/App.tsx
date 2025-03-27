import { Navigation } from './features/Navigation/Navigation';
import { Chat } from './features/Chat/Chat';

export function App() {
  return (
    <div className="font-quicksand flex h-full w-full">
      <Navigation />
      <Chat />
    </div>
  );
}

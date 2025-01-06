import './App.css';
import { GameProvider } from './context/GameContext';
import GameManager from './components/game/GameManager';

function App() {
  return (
    <GameProvider>
      <div className="app">
        <GameManager />
      </div>
    </GameProvider>
  );
}

export default App;
import "./App.css";
import { GameProvider } from "./context/gameContext";
import Game from "./game-screens/Game";

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;

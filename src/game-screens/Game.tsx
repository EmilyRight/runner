import "./game.css";
import { useGameContext } from "../context/gameContext";
import StartScreen from "./StartScreen/StartScreen";
// import { BrowserRouter, Route, Routes } from "react-router";
import GameScreen from "./GameScreen/GameScreen";
import GameOverScreen from "./GameOverScreen/GameOverScreen";
import WinScreen from "./WinScreen/WinScreen";

function Game() {
  const { screen } = useGameContext();
  return (
    // <WinScreen />
    <>
      {screen === "start" && <StartScreen />}
      {screen === "game" && <GameScreen />}
      {screen === "gameOver" && <GameOverScreen />}
      {screen === "win" && <WinScreen />}
    </>
  );
}

export default Game;

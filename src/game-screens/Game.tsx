import "./game.css";
import { useGameContext } from "../context/gameContext";
import StartScreen from "./StartScreen/StartScreen";
// import { BrowserRouter, Route, Routes } from "react-router";
import GameScreen from "./GameScreen/GameScreen";
import GameOverScreen from "./GameOverScreen/GameOverScreen";
import WinScreen from "./WinScreen/WinScreen";
import { useEffect } from "react";

function Game() {
  const { screen, restartGame } = useGameContext();

  useEffect(()=> {
    window.addEventListener("resize", restartGame)

    return (()=> {
      window.removeEventListener("resize", restartGame)
    })
  })


  return (
    <>
      {screen === "start" && <StartScreen />}
      {screen === "game" && <GameScreen />}
      {screen === "gameOver" && <GameOverScreen />}
      {screen === "win" && <WinScreen />}
    </>
  );
}

export default Game;

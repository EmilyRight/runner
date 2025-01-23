import { createContext, useContext, useState } from "react";
import { SCORE_TO_ACHIEVE } from "../constants/constants";

type TCard = {
  id: number;
  imgSrc: string;
  text: JSX.Element;
};

interface GameState {
  screen: "start" | "game" | "gameOver" | "win";
  coins: number;
  scoreToAchieve: number;
  isGameOver: boolean;
  isWin: boolean;
  isAnimationEnded: boolean;
  isFinalScreenShown: boolean;
  chosenCard: TCard | null;
}

interface GameContextType extends GameState {
  startGame: () => void;
  endGame: () => void;
  collectCoin: () => void;
  restartGame: () => void;
  winGame: () => void;
  setIsAnimationEnded: (isEnded: boolean) => void;
  setIsFinalScreenShown: (isShown: boolean) => void;
  setChosenCard: (card: TCard) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [screen, setScreen] = useState<GameState["screen"]>("start");
  const [coins, setCoins] = useState(0);
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinalScreenShown, setIsFinalScreenShown] = useState(false);
  const [chosenCard, setChosenCard] = useState<TCard | null>(null);
  const [isWin, setIsWin] = useState(false);
  const scoreToAchieve = SCORE_TO_ACHIEVE;

  const startGame = () => {
    setScreen("game");
    setCoins(0);
    setIsGameOver(false);
    setIsWin(false);
  };

  const endGame = () => {
    setScreen("gameOver");
    setIsGameOver(false);
  };

  const winGame = () => {
    setScreen("win");
    setIsGameOver(true);
  };

  const collectCoin = () => {
    setCoins((prevCoins) => prevCoins + 1);
  };

  const restartGame = () => {
    setScreen("start");
    setIsGameOver(false);
    setIsWin(false);
    setCoins(0);
    setIsFinalScreenShown(false);
    setChosenCard(null);
  };

  return (
    <GameContext.Provider
      value={{
        screen,
        coins,
        scoreToAchieve,
        isGameOver,
        isWin,
        isAnimationEnded,
        isFinalScreenShown,
        chosenCard,
        startGame,
        endGame,
        collectCoin,
        restartGame,
        winGame,
        setIsAnimationEnded,
        setIsFinalScreenShown,
        setChosenCard,
      }}>
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGameContext };

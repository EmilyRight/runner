import './game.css';
import { useGameContext } from '../context/gameContext';
import StartScreen from './StartScreen/StartScreen';
import GameScreen from './GameScreen/GameScreen';
import GameOverScreen from './GameOverScreen/GameOverScreen';
import WinScreen from './WinScreen/WinScreen';
import { OrintationLockModal } from '../components/OrientationModal/orientation-lock-modal';
import useOrientationChange from '../hooks/use-orientation-change';

enum GameScreenStep {
    START = 'start',
    GAME = 'game',
    GAME_OVER = 'gameOver',
    WIN = 'win',
}

function Game() {
    const { screen } = useGameContext();
    const { isLandscape, gameRef } = useOrientationChange();

    return (
        // <div className='game-screen' ref={gameRef}>
        //     <GameScreen />
        // </div>
        <div className='game-screen' ref={gameRef}>
            {screen === GameScreenStep.START && <StartScreen />}
            {screen === GameScreenStep.GAME && <GameScreen />}
            {screen === GameScreenStep.GAME_OVER && <GameOverScreen />}
            {screen === GameScreenStep.WIN && <WinScreen />}
            {<OrintationLockModal show={isLandscape} />}
        </div>
    );
}

export default Game;

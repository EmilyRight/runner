import './game.css';
import { useGameContext } from '../context/gameContext';
import StartScreen from './StartScreen/StartScreen';
import GameScreen from './GameScreen/GameScreen';
import GameOverScreen from './GameOverScreen/GameOverScreen';
import WinScreen from './WinScreen/WinScreen';
import { OrintationLockModal } from '../components/OrientationModal/orientation-lock-modal';
import useOrientationChange from '../hooks/use-orientation-change';

function Game() {
    const { screen } = useGameContext();
    const { isLandscape, gameRef } = useOrientationChange();

    return (
        <div className='game-screen' ref={gameRef}>
            {screen === 'start' && <StartScreen />}
            {screen === 'game' && <GameScreen />}
            {screen === 'gameOver' && <GameOverScreen />}
            {screen === 'win' && <WinScreen />}
            {<OrintationLockModal show={isLandscape} />}
        </div>
    );
}

export default Game;

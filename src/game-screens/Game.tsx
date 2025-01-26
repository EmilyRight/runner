import './game.css';
import { useRef } from 'react';

import useOrientation from '../hooks/use-screen-orintation';

import { useGameContext } from '../context/gameContext';
import StartScreen from './StartScreen/StartScreen';
import GameScreen from './GameScreen/GameScreen';
import GameOverScreen from './GameOverScreen/GameOverScreen';
import WinScreen from './WinScreen/WinScreen';
import { OrintationLockModal } from '../components/OrientationModal/orientation-lock-modal';

function Game() {
    const { screen } = useGameContext();
    const gameRef = useRef<HTMLDivElement | null>(null);
    const { isLandscapeCoarse } = useOrientation();

    return (
        <div className='game-screen' ref={gameRef}>
            {screen === 'start' && <StartScreen />}
            {screen === 'game' && <GameScreen />}
            {screen === 'gameOver' && <GameOverScreen />}
            {screen === 'win' && <WinScreen />}
            {<OrintationLockModal show={!!isLandscapeCoarse} />}
        </div>
    );
}

export default Game;

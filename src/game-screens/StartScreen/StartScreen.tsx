import { useRef } from 'react';


import Button from '../../components/Button/Button';
import { useGameContext } from '../../context/gameContext';
import {
    LOGO_IMG_SRC,
    START_PERSON_IMG_SRC,
} from '../../constants/imageSources';

import styles from './start-screen.module.css';

function StartScreen() {
    const { startGame } = useGameContext();
    const startScreenRef = useRef<HTMLDivElement | null>(null);


    const keyframes: Keyframe[] | PropertyIndexedKeyframes = [
        { left: '0%', offset: 0 },

        { left: '100%', offset: 1 },
    ];

    const options: KeyframeAnimationOptions = {
        duration: 300,
        delay: 0,
        iterations: 1,
        fill: 'forwards',
    };

    const handleStartGame = () => {
        const animation = startScreenRef.current?.animate(keyframes, options);
        animation?.finished.then(() => {
            startGame();
        });
        setTimeout(() => {}, 500);
    };

    return (
        <div className={`game-screen ${styles['start-screen']}`}>
            <div className={styles['start-container']} ref={startScreenRef}>
                <div className={styles['start-content']}>
                    <h1 className={styles.logo}>
                        <img src={LOGO_IMG_SRC} alt='' />
                    </h1>
                    <h2 className={`${styles.title} screen-header`}>Runner</h2>
                    <div className={styles.text}>
                        Собирай монетки, остерегайся угроз и&nbsp;выигрывай
                        приятные призы!
                    </div>
                    <div className={styles.person}>
                        <img src={START_PERSON_IMG_SRC} alt='' />
                    </div>
                    <Button
                        text='Начать игру'
                        action={handleStartGame}
                        className={`btn-orange ${styles.btn}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default StartScreen;

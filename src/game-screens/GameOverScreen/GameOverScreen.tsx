import Button from '../../components/Button/Button';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { DUCK_IMG_SRC, TEAR_IMG_SRC } from '../../constants/imageSources';
import { useGameContext } from '../../context/gameContext';

import styles from './gameover.module.css';

function GameOverScreen() {
    const { startGame } = useGameContext();

    const handleStartGame = () => {
        setTimeout(() => {
            startGame();
        }, 500);
    };

    return (
        <div className={`game-screen ${styles['gameover-screen']}`}>
            <ScreenHeader />
            <h3 className={`${styles.title} screen-header`}>Я упала...</h3>
            <div className={styles['screen-images']}>
                <div className={styles.duck}>
                    <img src={DUCK_IMG_SRC} alt='' />
                </div>
                <div className={styles.tears}>
                    <div className={`${styles.tear} ${styles['tear-left']}`}>
                        <img src={TEAR_IMG_SRC} alt='' />
                    </div>
                    <div className={`${styles.tear} ${styles['tear-right']}`}>
                        <img src={TEAR_IMG_SRC} alt='' />
                    </div>
                </div>
            </div>
            <Button
                text='Сыграть еще раз'
                action={handleStartGame}
                className={`btn-orange ${styles.btn}`}
            />
        </div>
    );
}

export default GameOverScreen;

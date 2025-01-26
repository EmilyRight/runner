import { useGameContext } from '../../context/gameContext';
import { COIN_ICON_IMG_SRC } from '../../constants/imageSources';

import styles from './score-label.module.css';

function ScoreLabel() {
    const { coins, scoreToAchieve } = useGameContext();
    return (
        <div className={styles['score-label']}>
            <div className={styles['score-image']}>
                <img src={COIN_ICON_IMG_SRC} alt='' />
            </div>
            <div className={styles.score}>
                <span className={styles['current-score']}>{ coins }</span>/
                <span className={styles['score-to-achieve']}>
                    { scoreToAchieve }
                </span>
            </div>
        </div>
    );
}

export default ScoreLabel;

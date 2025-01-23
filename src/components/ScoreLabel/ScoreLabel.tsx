import styles from "./score-label.module.css";
import { useGameContext } from "../../context/gameContext";


function ScoreLabel() {
  const { coins, scoreToAchieve } = useGameContext();
  return (
    <div className={styles["score-label"]}>
      <div className={styles["score-image"]}>
        <img src='../../src/assets/images/icons/coin.png' alt='' />
      </div>
      <div className={styles.score}>
        <span className={styles["current-score"]}>{coins}</span>/
        <span className={styles["score-to-achieve"]}>{scoreToAchieve}</span>
      </div>
    </div>
  );
}

export default ScoreLabel;

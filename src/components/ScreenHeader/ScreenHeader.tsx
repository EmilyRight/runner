import styles from "./screen-header.module.css";
import ScoreLabel from "../ScoreLabel/ScoreLabel";
import { useGameContext } from "../../context/gameContext";


const ScreenHeader = () => {
  const { restartGame, isFinalScreenShown } = useGameContext();

  const goToFirstScreen = () => {
    restartGame();
  };

  return (
    <div className={`${styles.header} ${isFinalScreenShown ? styles.hidden : ""}`}>
      <button className={styles["button-back"]} onClick={goToFirstScreen}>
        <img src='../../src/assets/images/icons/arrow.svg' alt='' />
      </button>
      <ScoreLabel />
    </div>
  );
};

export default ScreenHeader;

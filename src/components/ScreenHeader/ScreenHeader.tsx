import styles from "./screen-header.module.css";
import ScoreLabel from "../ScoreLabel/ScoreLabel";
import { useGameContext } from "../../context/gameContext";
import { ARROW_IMG_SRC } from "../../constants/imageSources";

const ScreenHeader = () => {
  const { restartGame, isFinalScreenShown } = useGameContext();

  const goToFirstScreen = () => {
    restartGame();
  };

  return (
    <div
      className={`${styles.header} ${isFinalScreenShown ? styles.hidden : ""}`}>
      <button className={styles["button-back"]} onClick={goToFirstScreen}>
        <img src={ARROW_IMG_SRC} alt='' />
      </button>
      <ScoreLabel />
    </div>
  );
};

export default ScreenHeader;

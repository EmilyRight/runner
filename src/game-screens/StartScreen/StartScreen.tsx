
import Button from "../../components/Button/Button";
import styles from "./start-screen.module.css";

import { useGameContext } from "../../context/gameContext";

function StartScreen() {
  const { startGame } = useGameContext();

  const handleStartGame = () => {
    setTimeout(() => {
      startGame();
    }, 500);
  };

  return (
    <div className={`game-screen ${styles["start-screen"]}`}>
      <div className={styles["start-container"]}>
        <div className={styles["start-content"]}>
          <h1 className={styles.logo}>
            <img src='../../src/assets/images/icons/LOGO.png' alt='' />
          </h1>
          <h2 className={`${styles.title} screen-header`}>Runner</h2>
          <div className={styles.text}>
            Собирай монетки, остерегайся угроз и&nbsp;выигрывай приятные призы!
          </div>
          <div className={styles.person}>
            <img src='../../src/assets/images/person/start-person.png' alt='' />
          </div>
          <Button
            text='Начать игру'
            action={handleStartGame}
            disabled={false}
            className={`btn-orange ${styles.btn}`}
          />
        </div>
      </div>
    </div>
  );
}

export default StartScreen;

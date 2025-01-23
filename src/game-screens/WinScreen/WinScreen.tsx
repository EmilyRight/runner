import { useEffect, useRef, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import { WIN_DUCK_IMG_SRC } from "../../constants/imageSources";
import styles from "./win-screen.module.css";
import {
  imageFinalKeyFrames,
  imageFinalOptions,
  imageKeyFrames,
  imageOptions,
  labelKeyframes,
  labelOptions,
  titleKeyFrames,
  titleOptions,
} from "./animationOptions";
import FinalScreen from "../FinalScreen/FinalScreen";
import { useGameContext } from "../../context/gameContext";

function WinScreen() {
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const fistTitleRef = useRef<HTMLHeadingElement | null>(null);
  const secondTitleRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isFinalBgReady, setIsFinalBgReady] = useState(false);
  const { isFinalScreenShown, chosenCard } = useGameContext();

  const animateElement = (
    element: HTMLElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: KeyframeAnimationOptions
  ): Promise<void> => {
    return new Promise((resolve) => {
      const animation = element.animate(keyframes, options);
      animation.onfinish = () => resolve();
    });
  };

  const handlePersonAnimation = async () => {
    if (imageBoxRef.current) {
      await animateElement(
        imageBoxRef.current,
        imageFinalKeyFrames,
        imageFinalOptions
      );
    }
  };

  const startAnimations = async () => {
    if (
      !fistTitleRef.current ||
      !secondTitleRef.current ||
      !labelRef.current ||
      !imageRef.current
    ) {
      return;
    }

    await animateElement(imageRef.current, imageKeyFrames, imageOptions);
    await animateElement(fistTitleRef.current, titleKeyFrames, titleOptions);
    fistTitleRef.current.classList.add(styles.hidden);

    await animateElement(secondTitleRef.current, titleKeyFrames, titleOptions);
    secondTitleRef.current.classList.add(styles.hidden);
    await animateElement(labelRef.current, labelKeyframes, labelOptions);
    // setIsFinalBgReady(true);
  };

  useEffect(() => {
    startAnimations()
      .then(() => {
        setIsFinalBgReady(true);
      })
      .catch((err) => console.error("Ошибка анимации:", err));
  }, []);

  return (
    <div className={`game-screen ${styles["win-screen"]}`}>
      <ScreenHeader />
      <div
        className={`${styles.titles} ${isFinalBgReady ? styles.hidden : ""}`}>
        <h3 className={`${styles.title} screen-header`} ref={fistTitleRef}>
          Бу! Испугался?
        </h3>
        <h3 className={`${styles.title} screen-header`} ref={secondTitleRef}>
          Не бойся!
        </h3>
        <div
          className={`${styles.label} ${
            isFinalScreenShown ? styles.hidden : ""
          }`}
          ref={labelRef}>
          ты выиграл!
        </div>
      </div>
      <div className={styles.confetti}></div>

      <FinalScreen
        title='Это победа!'
        topText='А вот и твой приз!'
        bottomText='Воспользоваться призом можно прямо сейчас'
        isReady={isFinalBgReady}
        animatePerson={handlePersonAnimation}
      />
      <div
        className={`${styles["screen-images"]} ${
          chosenCard ? styles.fadeIn : ""
        }`}
        ref={imageBoxRef}>
        <div className={styles.duck} ref={imageRef}>
          <img src={WIN_DUCK_IMG_SRC} alt='' />
        </div>
      </div>
    </div>
  );
}

export default WinScreen;

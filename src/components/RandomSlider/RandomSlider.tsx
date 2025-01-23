import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./random-slider.module.css";
import { cardsData } from "../../game-screens/FinalScreen/cards-data";
import { useGameContext } from "../../context/gameContext";
type TSliderProps = {
  isStarted: boolean;
  animatedClassName?: string;
};

function RandomSlider({ isStarted }: TSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const {
    setChosenCard,
  } = useGameContext();
  const animationRef = useRef<number | null>(null);
  const [coordX, setCoordX] = useState(0);
  const [update, setUpdate] = useState(false);

  const keyframes: Keyframe[] | PropertyIndexedKeyframes = [
    { opacity: 1, offset: 0 },
    { opacity: 1, offset: 0.8 },
    { opacity: 0, offset: 1 },
  ];

  const options: KeyframeAnimationOptions = {
    duration: 3000,
    delay: 0,
    iterations: 1,
    fill: "forwards",
  };

  // const getRandomIndex = () => {
  //   return Math.floor(Math.random() * cardsData.length);
  // };

  const updateCoordX = useCallback(() => {
    if (!sliderRef.current) return;

    // const padding = -16;
    const randomIndex = 4;
    setSelectedCardIndex(randomIndex);
    const cards = Array.from(sliderRef.current.children) as HTMLElement[];
    const targetCard = cards[randomIndex];
    if (targetCard) {
      setTimeout(() => {
        targetCard.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
        if (sliderRef.current) {
          sliderRef.current.animate(keyframes, options);
          setTimeout(() => {
            const chosenCard = cardsData[randomIndex];
            setChosenCard(chosenCard);
          }, 5000);
        }
      }, 2000);
    }
  }, []);

  useEffect(() => {
    setUpdate(isStarted);
  }, [isStarted]);

  useEffect(() => {
    if (update) {
      updateCoordX();
    }
    console.log("update");
  }, [update, updateCoordX]);

  return (
    <div className={`${styles.slider}`}>
      <div
        className={styles.sliderInner}
        ref={sliderRef}
        // style={{
        //   transform: `translateX(-${coordX}px)`,
        //   transition: "transform 0.5s ease-in-out",
        // }}
        >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              selectedCardIndex === index ? styles.active : ""
            }`}
            ref={(el) => {
              if (cardRefs.current) {
                cardRefs.current[index] = el;
              }
            }}>
            <img
              className={styles["card-image"]}
              src={card.imgSrc}
              alt='Card'
            />
            <p className={styles.card_description}>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomSlider;

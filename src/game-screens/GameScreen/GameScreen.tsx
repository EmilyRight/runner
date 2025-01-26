import styles from "./game-screen.module.css";
import GameBackground from "../../components/GameBackground/GameBackground";
import Person from "../../components/Person/Person";
import React, { useEffect, useRef, useState } from "react";
import Coin from "../../components/Coin/Coin";
import { useGameContext } from "../../context/gameContext";
import Hole from "../../components/Hole/Hole";
import { SCORE_TO_ACHIEVE } from "../../constants/constants";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";

type Item = {
  id: string; // Уникальный идентификатор
  type: "coin" | "hole"; // Тип элемента: монетка или ямка
  x: number; // Координата по оси X
  y: number; // Координата по оси Y
  speed: number;
  isCollected?: boolean | undefined;
};

function GameScreen() {
  const personRef = useRef<HTMLDivElement | null>(null);
  const legsRef = useRef<HTMLDivElement | null>(null);
  const personAnimationRef = useRef<Animation | null>(null);
  const [itemRefs, setItemRefs] = useState<
    Record<string, React.RefObject<HTMLDivElement>>
  >({});
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const { coins, collectCoin, endGame, winGame, isAnimationEnded } =
    useGameContext();
  const [personCoords, setPersonCoords] = useState<DOMRect | null>(null);
  const [legsCoords, setLegsCoords] = useState<DOMRect | null>(null);
  const [coinCollected, setCoinCollected] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isFalling, setIsFalling] = useState(false);
  const keyFrames: Keyframe[] | PropertyIndexedKeyframes = [
    { transform: "none" },
    { transform: "translate(-100%, 25%) rotate(90deg)" },
  ];

  const options: KeyframeAnimationOptions = {
    duration: 500,
    iterations: 1,
    fill: "forwards",
  };

  const checkCollision = () => {
    if (isFalling || !personCoords || !legsCoords) return;

    items.forEach((item) => {
      const itemRef = itemRefs[item.id]?.current;
      const itemRect = itemRef?.getBoundingClientRect();

      if (itemRect) {
        let isIntersecting = false; // Изначально не пересекается

        if (item.type === "coin") {
          // Проверяем опорные точки всего персонажа
          isIntersecting =
            personCoords.top < itemRect.bottom &&
            personCoords.bottom > itemRect.top &&
            personCoords.left < itemRect.right &&
            personCoords.right > itemRect.left;
        } else if (item.type === "hole") {
          isIntersecting =
            legsCoords.left < itemRect.right &&
            legsCoords.right >= itemRect.left &&
            legsCoords.top < itemRect.bottom &&
            legsCoords.bottom >= itemRect.top;
        }

        if (isIntersecting) {
          if (item.type === "coin") {
            collectCoin();
            setCoinCollected(true);
            setItems((prevItems) =>
              prevItems.map((i) =>
                i.id === item.id ? { ...i, isCollected: true } : i
              )
            );
          } else if (item.type === "hole" && personRef.current) {
            setIsFalling(true);
            triggerFallAnimation();
          }
        }
      }
    });
  };

  const triggerFallAnimation = () => {
    if (personRef.current) {
      setIsFalling(true);
      personAnimationRef.current = personRef.current?.animate(
        keyFrames,
        options
      );
      personAnimationRef.current.finished.then(() => {
        setIsFalling(false);
        endGame();
      });
    }
  };

  const frameAnimation = () => {
    if (animationRef.current !== null) {
      animationRef.current = requestAnimationFrame(frameAnimation);
      updateItems(); // Частое обновление позиций и проверка
    }
  };

  const handlePersonCoords = (coords: DOMRect) => {
    setPersonCoords(coords);
  };

  const generateItem = () => {
    const itemType = Math.random() > 0.5 ? "coin" : "hole";
    const fieldDimentions = fieldRef.current?.getBoundingClientRect();
    if (fieldDimentions) {
      const newItem: Item = {
        id: Math.random().toString(36).substring(2, 9), // Уникальный ID
        type: itemType,
        x: window.innerWidth > 1024 ? window.innerWidth / 2 : window.innerWidth,
        y:
          itemType === "coin"
            ? Math.random() * fieldDimentions.height * 0.2 // Монетка спавнится на верхней половине экрана
            : fieldDimentions.height * 0.18, // Яма создается внизу,
        speed: 2,
        isCollected: itemType === "coin" ? false : undefined,
      };

      setItems((prevItems) => [...prevItems, newItem]);
      const newRef = (itemRefs[newItem.id] = React.createRef());
      setItemRefs((prevItemRefs) => ({
        ...prevItemRefs,
        [newItem.id]: newRef,
      }));
    }
  };

  const updateItems = () => {
    const fieldDimentions = fieldRef.current?.getBoundingClientRect();
    if (fieldDimentions) {
      const itemFlop = fieldDimentions.width * 0.3;
      setItems(
        (prevItems) =>
          prevItems
            .map((item) => ({ ...item, x: item.x - item.speed })) // Уменьшаем координату X
            .filter((item) => item.x + itemFlop > 0) // Убираем элементы, вышедшие за левый край
      );
      checkCollision();
    }
  };

  const updateCollecting = (id: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
    setCoinCollected(false);
  };

  useEffect(() => {
    const generateInterval = setInterval(() => {
      generateItem();
    }, 3000);

    return () => clearInterval(generateInterval);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(frameAnimation);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!coinCollected) {
      checkCollision();
    }
  }, [personCoords, items]);

  useEffect(() => {
    if (isAnimationEnded && coins === SCORE_TO_ACHIEVE) {
      winGame();
    }
  }, [coins, isAnimationEnded]);

  return (
    <div className={`game-screen ${styles["game-screen"]}`}>
      <GameBackground />
      <ScreenHeader />
      <div className={styles["game-field"]} ref={fieldRef}>
        <Person
          ref={personRef}
          setCoords={handlePersonCoords}
          setLegCoords={setLegsCoords}
          legsRef={legsRef}
        />

        {items.map((item) =>
          item.type === "coin" ? (
            <Coin
              key={item.id}
              id={item.id}
              coinCollected={item.isCollected}
              updateCollecting={updateCollecting}
              ref={itemRefs[item.id]}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
              }}
            />
          ) : (
            <Hole
              key={item.id}
              ref={itemRefs[item.id]}
              style={{
                position: "absolute",
                bottom: item.y,
                left: item.x,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default GameScreen;

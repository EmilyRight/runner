import { useEffect, useRef, useState } from "react";
import styles from "./game-background.module.css";
import { BG_HEIGHT, BG_WIDTH } from "../../constants/constants";

function GameBackground() {
  const [offset, setOffset] = useState(0);
  const speed = 2.1;
  const animationRef = useRef<number | null>(null);
  const [bgWidth, setBgWidth] = useState(() => calculateBgWidth());

  function calculateBgWidth() {
    const windowHeight = window.innerHeight;
    return (windowHeight / BG_HEIGHT) * BG_WIDTH;
  }

  useEffect(() => {
    const handleResize = () => {
      setBgWidth(calculateBgWidth());
    };
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {

    const animate = () => {
        setOffset((prevOffset) => prevOffset + speed);
        animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className={styles["game-screen-background"]}
      style={{
        backgroundPositionX: `-${offset}px`,
        width: `${bgWidth}px`,
      }}></div>
  );
}

export default GameBackground;

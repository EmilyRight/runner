import { forwardRef } from "react";
import styles from "./hole.module.css";

type HoleProps = {
  style?: React.CSSProperties;
};

const Hole = forwardRef(({ style }: HoleProps, ref) => {
  const holeRef = ref as React.RefObject<HTMLDivElement>;

  return (
    <div className={styles["hole-box"]} style={style}>
      <div className={styles["hole"]} ref={holeRef}></div>
      <img src='../../src/assets/images/hole.png' alt='' />
    </div>
  );
});

export default Hole;

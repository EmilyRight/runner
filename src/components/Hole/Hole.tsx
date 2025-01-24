import { forwardRef } from "react";
import styles from "./hole.module.css";
import { HOLE_IMG_SRC } from "../../constants/imageSources";

type HoleProps = {
  style?: React.CSSProperties;
};

const Hole = forwardRef(({ style }: HoleProps, ref) => {
  const holeRef = ref as React.RefObject<HTMLDivElement>;

  return (
    <div className={styles["hole-box"]} style={style}>
      <div className={styles["hole"]} ref={holeRef}></div>
      <img src={HOLE_IMG_SRC} alt='' />
    </div>
  );
});

export default Hole;

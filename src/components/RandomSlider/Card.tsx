import styles from "./random-slider.module.css";

type CardProps = {
  src: string;
  text: JSX.Element;
};

function Card({ src, text }: CardProps) {

  return (
    <div className={`${styles.card} ${styles.chosen}`}>
      <img className={styles["card-image"]} src={src} alt='Card' />
      <p className={styles.card_description}>{text}</p>
    </div>
  );
}

export default Card;

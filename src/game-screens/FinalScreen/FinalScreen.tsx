import { useEffect, useRef, useState } from 'react';

import { useGameContext } from '../../context/gameContext';
import { backGroundKeyframes, backGroundOptions } from './animationOptions';
import RandomSlider from '../../components/RandomSlider/RandomSlider';
import Card from '../../components/RandomSlider/Card';

import styles from './final-screen.module.css';

type FinalScreenProps = {
    title: string;
    topText: string;
    bottomText: string;
    isReady: boolean;
    isPaused: boolean;
    animatePerson: () => Promise<void>;
};

function FinalScreen({
    title,
    topText,
    bottomText,
    isReady,
    isPaused,
    animatePerson,
}: FinalScreenProps) {
    const {
        isFinalScreenShown,
        setIsFinalScreenShown,
        chosenCard,
        restartGame,
    } = useGameContext();

    const bgRef = useRef<HTMLDivElement | null>(null);
    const [sliderAnimation, setSliderAnimation] = useState(false);

    const animateElement = (
        element: HTMLElement,
        keyframes: Keyframe[] | PropertyIndexedKeyframes,
        options: KeyframeAnimationOptions,
    ): Promise<void> => {
        return new Promise((resolve) => {
            const animation = element.animate(keyframes, options);
            animation.onfinish = () => {
                resolve();
            };
        });
    };

    const startAnimations = async () => {
        if (!bgRef.current) return;

        if (isReady && !isPaused) {
            await animateElement(
                bgRef.current,
                backGroundKeyframes,
                backGroundOptions,
            );
            setIsFinalScreenShown(true);
        }
    };

    const restart = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        restartGame();
    };

    useEffect(() => {
        startAnimations();
    }, [isReady]);

    useEffect(() => {
        if (isFinalScreenShown) {
            animatePerson();
            setSliderAnimation(true);
        }
    }, [isFinalScreenShown]);

    return (
        <div className={styles.container}>
            <div className={styles.background} ref={bgRef} />
            <div
                className={`${styles.content} ${
                    !isFinalScreenShown ? styles.hidden : 'fadeOut'
                }`}
            >
                <div
                    className={`${styles['content-header']} ${
                        chosenCard ? styles.hidden : 'fadeOut'
                    }`}
                >
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{topText}</p>
                </div>
                <RandomSlider
                    isStarted={sliderAnimation}
                    animatedClassName={chosenCard ? 'fadeOut' : ''}
                />
                {chosenCard ? (
                    <Card src={chosenCard.imgSrc} text={chosenCard.text} />
                ) : (
                    ''
                )}
                <div
                    className={`${styles.footer} ${chosenCard ? '' : styles.hidden}`}
                >
                    <p className={styles.description}>{bottomText}</p>
                    <a href='/' className={styles.btn} onClick={restart}>
                        Перейти к&nbsp;подборке
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FinalScreen;

import { useEffect, useRef, useState } from 'react';

import useOrientationChange from '../../hooks/use-orientation-change';

import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import { WIN_DUCK_IMG_SRC } from '../../constants/imageSources';
import {
    imageFinalKeyFrames,
    imageFinalOptions,
    imageKeyFrames,
    imageOptions,
    labelKeyframes,
    labelOptions,
    titleKeyFrames,
    titleOptions,
} from './animationOptions';
import FinalScreen from '../FinalScreen/FinalScreen';
import { useGameContext } from '../../context/gameContext';

import styles from './win-screen.module.css';

function WinScreen() {
    const imageBoxRef = useRef<HTMLDivElement | null>(null);
    const fistTitleRef = useRef<HTMLHeadingElement | null>(null);
    const secondTitleRef = useRef<HTMLHeadingElement | null>(null);
    const labelRef = useRef<HTMLHeadingElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const [isFinalBgReady, setIsFinalBgReady] = useState(false);
    const { isFinalScreenShown, chosenCard } = useGameContext();
    const currentAnimationRef = useRef<Animation | null>(null);
    // const { isLandscapeCoarse } = useOrientation();
    const isLandscape = useOrientationChange();
    const isPaused = useRef(false);

    const animateElement = (
        element: HTMLElement,
        keyframes: Keyframe[] | PropertyIndexedKeyframes,
        options: KeyframeAnimationOptions
    ): Promise<void> => {
        return new Promise((resolve) => {
            const animation = element.animate(keyframes, options);
            currentAnimationRef.current = animation;
            if (isPaused.current) {
                console.log(
                    'Анимация приостановлена (isPaused стоит на true).'
                );
                resolve(); // Завершаем Promise, но не запускаем анимацию.
            }
            animation.onfinish = () => {
                // currentAnimationRef.current = null;
                resolve();
            };

            animation.oncancel = () => {
                // В случае отмены анимации
                console.log('Анимация отменена.');
                resolve(); // Считаем завершенной
            };
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

        try {
            if (isPaused.current) return; // Прекращаем анимацию, если стоит пауза.

            await animateElement(
                imageRef.current,
                imageKeyFrames,
                imageOptions
            );

            if (isPaused.current) return;
            await animateElement(
                fistTitleRef.current,
                titleKeyFrames,
                titleOptions
            );
            fistTitleRef.current.classList.add(styles.hidden);

            if (isPaused.current) return;
            await animateElement(
                secondTitleRef.current,
                titleKeyFrames,
                titleOptions
            );
            secondTitleRef.current.classList.add(styles.hidden);

            if (isPaused.current) return;
            await animateElement(
                labelRef.current,
                labelKeyframes,
                labelOptions
            );
        } catch (error) {
            console.error('Ошибка анимации:', error);
        }
    };

    useEffect(() => {
        console.log('isLandscape:', isLandscape);
        console.log(
            'currentAnimationRef.current:',
            currentAnimationRef.current
        );
        if (currentAnimationRef.current) {
            if (isLandscape) {
                currentAnimationRef.current.pause();
                isPaused.current = true;
                console.log(currentAnimationRef.current, isLandscape);
            } else {
                currentAnimationRef.current.play();
                isPaused.current = false;
                console.log(isPaused.current);
            }
        }
    }, [isLandscape]);

    useEffect(() => {
        startAnimations()
            .then(() => {
                if (!isPaused.current) {
                    setIsFinalBgReady(true);
                }
            })
            .catch((err) => console.error('Ошибка анимации:', err));
    }, []);

    return (
        <div className={`game-screen ${styles['win-screen']}`}>
            <ScreenHeader />
            <div
                className={`${styles.titles} ${
                    isFinalBgReady ? styles.hidden : ''
                }`}>
                <h3
                    className={`${styles.title} screen-header`}
                    ref={fistTitleRef}>
                    Бу! Испугался?
                </h3>
                <h3
                    className={`${styles.title} screen-header`}
                    ref={secondTitleRef}>
                    Не бойся!
                </h3>
                <div
                    className={`${styles.label} ${
                        isFinalScreenShown ? styles.hidden : ''
                    }`}
                    ref={labelRef}>
                    ты выиграл!
                </div>
            </div>
            <div className={styles.confetti} />

            <FinalScreen
                title='Это победа!'
                topText='А вот и твой приз!'
                bottomText='Воспользоваться призом можно прямо сейчас'
                isReady={isFinalBgReady}
                isPaused={isPaused.current}
                animatePerson={handlePersonAnimation}
            />
            <div
                className={`${styles['screen-images']} ${
                    chosenCard ? styles.fadeIn : ''
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

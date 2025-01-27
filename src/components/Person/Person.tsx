import {
    forwardRef,
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';

import { useGameContext } from '../../context/gameContext';
import PersonShadow from '../PersonShadow/PersonShadow';
import {
    LLEG_IMG_SRC,
    PERSON_BODY_IMG_SRC,
    RLEG_IMG_SRC,
} from '../../constants/imageSources';

import styles from './person.module.css';
import {
    bodyKeyframes,
    bodyOptions,
    leftLegKeyframes,
    leftLegOptions,
    personKeyFrames,
    personOptions,
    rightLegKeyframes,
    rightLegOptions,
} from './animationOptions';

type PersonProps = {
    setCoords: (coords: DOMRect) => void;
    setLegCoords: (coords: DOMRect) => void;
    legsRef: React.RefObject<HTMLDivElement>;
    isLandscape: boolean;
};

const Person = forwardRef<HTMLDivElement, PersonProps>(
    ({ setCoords, setLegCoords, legsRef, isLandscape }, ref) => {
        const personRef = ref as React.RefObject<HTMLDivElement>;
        const isJumpingRef = useRef(false);
        const [isJumping, setIsJumping] = useState(false);
        const bodyRef = useRef<HTMLDivElement | null>(null);
        const rightLegRef = useRef<HTMLDivElement | null>(null);
        const leftLegRef = useRef<HTMLDivElement | null>(null);
        const bodyAnimationsRef = useRef<Animation[] | null>([]);

        const coordY = useRef(0);
        const animationRef = useRef<Animation | null>(null);
        const { setIsAnimationEnded } = useGameContext();
        const [, forceUpdate] = useReducer((x) => x + 1, 0);

        useEffect(() => {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

            if (isIOS) {
                console.log('====================================');
                console.log('IOS');
                console.log('====================================');
                const timer = setTimeout(() => {
                    forceUpdate();
                }, 100);

                return () => clearTimeout(timer);
            }
        }, []);

        const trackAnimation = () => {
            if (animationRef.current) {
                const effect = animationRef.current.effect as KeyframeEffect;
                if (effect && effect.getComputedTiming) {
                    const progress = effect.getComputedTiming().progress || 0;
                    const maxHeight = -100;
                    coordY.current = maxHeight * progress;
                    const personRect =
                        personRef.current!.getBoundingClientRect();
                    const legsRect = legsRef.current!.getBoundingClientRect();
                    setCoords(personRect);
                    setLegCoords(legsRect);
                }
            }

            if (isJumpingRef.current) {
                requestAnimationFrame(trackAnimation);
            }
        };

        const handlePressSpaceKey = (e: Event): void => {
            if (!personRef?.current || isJumpingRef.current) return;

            if (e instanceof KeyboardEvent) {
                setIsJumping(true);
                isJumpingRef.current = true;
                if (e.code === 'Space') {
                    animationRef.current = personRef.current.animate(
                        personKeyFrames,
                        personOptions
                    );
                    setIsAnimationEnded(false);
                }
            } else if (e instanceof TouchEvent) {
                setIsJumping(true);
                isJumpingRef.current = true;
                animationRef.current = personRef.current.animate(
                    personKeyFrames,
                    personOptions
                );
                setIsAnimationEnded(false);
            }
            requestAnimationFrame(trackAnimation);
            if (animationRef.current) {
                animationRef.current.finished.then(() => {
                    setIsJumping(false);
                    isJumpingRef.current = false;
                    setIsAnimationEnded(true);
                    coordY.current = 0;
                });
            }
        };

        const createAnimations = useCallback(() => {
            if (!bodyRef.current || !leftLegRef.current || !rightLegRef.current)
                return;

            bodyAnimationsRef.current?.forEach((animation) =>
                animation.cancel()
            );
            bodyAnimationsRef.current = [];

            const elements = [
                bodyRef.current,
                leftLegRef.current,
                rightLegRef.current,
            ];

            type AnimationTuple = [
                Keyframe[] | PropertyIndexedKeyframes,
                KeyframeAnimationOptions
            ];
            const animationOptions: AnimationTuple[] = [
                [bodyKeyframes, bodyOptions],
                [leftLegKeyframes, leftLegOptions],
                [rightLegKeyframes, rightLegOptions],
            ];

            elements.forEach((element, i) => {
                const [keyframes, options] = animationOptions[i];
                const animation = element.animate(keyframes, options);
                bodyAnimationsRef.current?.push(animation);

                if (isLandscape || isJumpingRef.current === true) {
                    animation.pause();
                }
            });
        }, [isLandscape, isJumping]);

        useEffect(() => {
            createAnimations();

            bodyAnimationsRef.current?.forEach((animation) => {
                if (isLandscape || isJumping) {
                    animation.pause();
                } else {
                    animation.play();
                }
            });

            return () => {
                bodyAnimationsRef.current?.forEach((animation) =>
                    animation.cancel()
                );
            };
        }, [isLandscape, createAnimations, isJumping]);

        useEffect(() => {
            if (!isLandscape) {
                document.addEventListener('keydown', handlePressSpaceKey);
                window.addEventListener('touchstart', handlePressSpaceKey);
                const personRect = personRef.current!.getBoundingClientRect();
                const legsRect = legsRef.current!.getBoundingClientRect();
                setCoords(personRect);
                setLegCoords(legsRect);
            }
            return () => {
                document.removeEventListener('keydown', handlePressSpaceKey);
                window.removeEventListener('touchstart', handlePressSpaceKey);
            };
        }, []);

        return (
            <>
                <div className={styles.person} ref={personRef}>
                    <div
                        className={`${styles.body} ${styles['person-body']}`}
                        ref={bodyRef}>
                        <img
                            src={PERSON_BODY_IMG_SRC}
                            alt=''
                            className={`${styles['body-img']} `}
                        />
                    </div>

                    <div
                        className={`${styles['right-leg']} ${styles['person-body']} `}
                        ref={rightLegRef}>
                        <img
                            src={RLEG_IMG_SRC}
                            alt=''
                            className={styles['body-img']}
                        />
                    </div>
                    <div
                        className={`${styles['left-leg']} ${styles['person-body']} `}
                        ref={leftLegRef}>
                        <img
                            src={LLEG_IMG_SRC}
                            alt=''
                            className={styles['body-img']}
                        />
                    </div>
                    <div className={styles['legs-threshold']} ref={legsRef} />
                </div>
                <PersonShadow isJumping={isJumpingRef.current} />
            </>
        );
    }
);

Person.displayName = 'Person';
export default Person;

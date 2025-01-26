import { forwardRef, useEffect, useRef } from 'react';

import useOrientation from '../../hooks/use-screen-orintation';

import { useGameContext } from '../../context/gameContext';
import PersonShadow from '../PersonShadow/PersonShadow';
import {
    LLEG_IMG_SRC,
    PERSON_BODY_IMG_SRC,
    RLEG_IMG_SRC,
} from '../../constants/imageSources';

import styles from './person.module.css';

type PersonProps = {
    setCoords: (coords: DOMRect) => void;
    setLegCoords: (coords: DOMRect) => void;
    legsRef: React.RefObject<HTMLDivElement>;
};

const Person = forwardRef<HTMLDivElement, PersonProps>(
    ({ setCoords, setLegCoords, legsRef }, ref) => {
        const personRef = ref as React.RefObject<HTMLDivElement>;
        const isJumpingRef = useRef(false);
        const coordY = useRef(0);
        const animationRef = useRef<Animation | null>(null);
        const { setIsAnimationEnded } = useGameContext();
        const { isLandscapeCoarse } = useOrientation();
        const personKeyFrames: Keyframe[] | PropertyIndexedKeyframes = [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-200%)' },
            { transform: 'translateY(0)' },
        ];

        const personOptions: KeyframeAnimationOptions = {
            duration: 2000,
            iterations: 1,
            fill: 'forwards',
        };

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
                isJumpingRef.current = true;
                if (e.code === 'Space') {
                    animationRef.current = personRef.current.animate(
                        personKeyFrames,
                        personOptions
                    );
                    setIsAnimationEnded(false);
                }
            } else if (e instanceof TouchEvent) {
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
                    isJumpingRef.current = false;
                    setIsAnimationEnded(true);
                    coordY.current = 0;
                });
            }
        };

        useEffect(() => {
            if (!isLandscapeCoarse) {
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
        }, [isLandscapeCoarse]);

        return (
            <>
                <div className={styles.person} ref={personRef}>
                    <div
                        className={`${styles.body} ${styles['person-body']} ${
                            !isLandscapeCoarse ? styles.moving : ''
                        }`}>
                        <img
                            src={PERSON_BODY_IMG_SRC}
                            alt=''
                            className={`${styles['body-img']} ${styles['person-body']} `}
                        />
                    </div>

                    <div
                        className={`${styles['right-leg']} ${
                            styles['person-body']
                        } ${!isLandscapeCoarse ? styles.moving : ''}`}>
                        <img
                            src={RLEG_IMG_SRC}
                            alt=''
                            className={styles['body-img']}
                        />
                    </div>
                    <div
                        className={`${styles['left-leg']} ${
                            styles['person-body']
                        } ${!isLandscapeCoarse ? styles.moving : ''}`}>
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

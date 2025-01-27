import { useEffect, useRef, useState } from 'react';

import { BG_HEIGHT, BG_WIDTH } from '../../constants/constants';

import styles from './game-background.module.css';

type GameBackgroundProps = {
    isLandscape: boolean;
};

function GameBackground({ isLandscape }: GameBackgroundProps) {
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
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isLandscape) {
            const animate = () => {
                setOffset((prevOffset) => prevOffset + speed);
                animationRef.current = requestAnimationFrame(animate);
            };
            animationRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isLandscape]);

    return (
        <div
            className={styles['game-screen-background']}
            style={{
                backgroundPositionX: `-${offset}px`,
                width: `${bgWidth}px`,
            }}
        />
    );
}

export default GameBackground;

import { useEffect, useRef, useState } from 'react';

import useOrientation from '../../hooks/use-screen-orintation';

import { BG_HEIGHT, BG_WIDTH } from '../../constants/constants';

import styles from './game-background.module.css';

function GameBackground() {
    const [offset, setOffset] = useState(0);
    const speed = 2.1;
    const animationRef = useRef<number | null>(null);
    const [bgWidth, setBgWidth] = useState(() => calculateBgWidth());
    const { isLandscapeCoarse } = useOrientation();

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
        if (!isLandscapeCoarse) {
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
    }, [isLandscapeCoarse]);

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

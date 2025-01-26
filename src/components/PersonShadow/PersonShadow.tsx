import { useEffect, useRef } from 'react';

import styles from './person-shadow.module.css';

type PersonShadowProps = {
    isJumping: boolean;
};

function PersonShadow({ isJumping }: PersonShadowProps) {
    const shadowRef = useRef<HTMLDivElement | null>(null);
    const keyFrames: Keyframe[] | PropertyIndexedKeyframes = [
        { transform: 'translateX(0%) scale(1)' },
        { transform: 'translateX(0%) scale(0.7)' },
        { transform: 'translateX(0%) scale(1)' },
    ];

    const options: KeyframeAnimationOptions = {
        duration: 2000,
        iterations: 1,
        fill: 'forwards',
    };

    useEffect(() => {
        if (isJumping) {
            shadowRef.current?.animate(keyFrames, options);
        }
    }, [isJumping]);

    return <div className={styles['person-shadow']} ref={shadowRef} />;
}

export default PersonShadow;

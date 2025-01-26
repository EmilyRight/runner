import React, { forwardRef, useEffect, useRef } from 'react';
import './coin.css';
type CoinProps = {
    id: string;
    coinCollected: boolean | undefined;
    updateCollecting: (id: string) => void;
    style?: React.CSSProperties;
};

const Coin = forwardRef(
    ({ id, coinCollected, style, updateCollecting }: CoinProps, ref) => {
        const coinRef = ref as React.RefObject<HTMLDivElement>;

        const animationRef = useRef<Animation | null>(null);

        const keyFrames: Keyframe[] | PropertyIndexedKeyframes = [
            { transform: 'scale(1)' },
            { transform: 'scale(0)' },
        ];

        const options: KeyframeAnimationOptions = {
            duration: 100,
            iterations: 1,
            fill: 'forwards',
        };

        const handleAnimation = () => {
            if (coinRef.current) {
                animationRef.current = coinRef.current.animate(
                    keyFrames,
                    options,
                );
                animationRef.current.finished.then(() => {
                    updateCollecting(id);
                });
            }
        };

        useEffect(() => {
            if (coinCollected) {
                handleAnimation();
            }
        }, [coinCollected]);

        return <div className='coin-box' ref={coinRef} style={style} />;
    },
);
Coin.displayName = 'Coin';
export default Coin;

import { useEffect, useRef, useState } from 'react';

function useOrientationChange() {
    const [isLandscape, setIsLandscape] = useState(false);
    const gameRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (gameRef.current) {
                const { offsetWidth, offsetHeight } = gameRef.current;
                setIsLandscape(offsetWidth > offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isLandscape, gameRef };
}

export default useOrientationChange;

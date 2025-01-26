import { useEffect, useState } from 'react';

function useOrientationChange() {
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            setIsLandscape(innerWidth > innerHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isLandscape;
}

export default useOrientationChange;

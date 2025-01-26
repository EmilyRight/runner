import { forwardRef } from 'react';

import { HOLE_IMG_SRC } from '../../constants/imageSources';

import styles from './hole.module.css';

type HoleProps = {
    style?: React.CSSProperties;
};

const Hole = forwardRef(({ style }: HoleProps, ref) => {
    const holeRef = ref as React.RefObject<HTMLDivElement>;

    return (
        <div className={styles['hole-box']} style={style}>
            <div className={styles['hole']} ref={holeRef} />
            <img src={HOLE_IMG_SRC} alt='' />
        </div>
    );
});

Hole.displayName = 'Hole';

export default Hole;

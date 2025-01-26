import classNames from 'classnames';

import './button.css';
import useOrientation from '../../hooks/use-screen-orintation';

type TButtonProps = {
    action?: () => void;
    className: string;
    text: string;
};

function Button({ text, action, className }: TButtonProps) {
    const btnClassNames = classNames(className);
    const { isLandscapeCoarse } = useOrientation();
    return (
        <button
            onClick={action}
            disabled={!!isLandscapeCoarse}
            type='button'
            className={btnClassNames}>
            {text}
        </button>
    );
}

export default Button;

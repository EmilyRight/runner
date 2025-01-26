import { useEffect, useState } from 'react';

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, EventListenerOrEventListenerObject | null, ...unknown[]]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['removeEventListener']> | [string, EventListenerOrEventListenerObject | null, ...unknown[]]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

export interface OrientationState {
  angle: number;
  type: string;
  isLandscapeCoarse?: boolean;
}

const defaultState: OrientationState = {
  angle: 0,
  type: 'landscape-primary',
  isLandscapeCoarse: false,
};

const useOrientation = (initialState: OrientationState = defaultState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const screenObj = window.screen;
    let mounted = true;

    const mediaQueryList = window.matchMedia(
      '(orientation: landscape) and (hover: none) and (pointer: coarse)'
    );

    const onChange = () => {
      if (!mounted) return;

      const { orientation } = screenObj;

      if (orientation) {
        const { angle, type } = orientation;
        setState({
          angle,
          type,
          isLandscapeCoarse: mediaQueryList.matches,
        });
      } else {
        setState({
          ...initialState,
          isLandscapeCoarse: mediaQueryList.matches,
        });
      }
    };

    on(window, 'orientationchange', onChange);

    const handleMediaChange = () => {
      onChange();
    };

    mediaQueryList.addEventListener('change', handleMediaChange);

    onChange();

    return () => {
      mounted = false;
      off(window, 'orientationchange', onChange);
      mediaQueryList.removeEventListener('change', handleMediaChange);
    };
  }, [initialState]);

  return state;
};

export default useOrientation;
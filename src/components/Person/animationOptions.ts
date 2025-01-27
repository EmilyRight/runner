export const personKeyFrames: Keyframe[] | PropertyIndexedKeyframes = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-200%)' },
    { transform: 'translateY(0)' },
];

export const personOptions: KeyframeAnimationOptions = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards',
};

export const bodyKeyframes: Keyframe[] | PropertyIndexedKeyframes = [
    {
        transform: 'translate(-50%, 0%)',
        offset: 0,
    },
    {
        transform: 'translate(-50%, -2%)',
        offset: 0.5,
    },
    {
        transform: 'translate(-50%, 0%)',
        offset: 1,
    },
];

export const bodyOptions: KeyframeAnimationOptions = {
    duration: 600,
    delay: 0,
    iterations: Infinity,
    fill: 'forwards',
};

export const rightLegKeyframes: Keyframe[] | PropertyIndexedKeyframes = [
    {
        bottom: '-3%',
        transform: 'translateX(-62%) rotate(-21deg)',
        offset: 0,
    },
    {
        bottom: '-2%',
        transform: 'translateX(-77%) rotate(19deg)',
        offset: 1,
    },
];

export const rightLegOptions: KeyframeAnimationOptions = {
    duration: 300,
    delay: 0,
    direction: 'alternate',
    iterations: Infinity,
    fill: 'forwards',
};

export const leftLegKeyframes: Keyframe[] | PropertyIndexedKeyframes = [
    {
        bottom: '0%',
        transform: 'translateX(-74%) rotate(20deg)',
        offset: 0,
    },
    {
        bottom: '0%',
        transform: 'translateX(-41%) rotate(-21deg)',
        offset: 1,
    },
];

export const leftLegOptions: KeyframeAnimationOptions = {
    duration: 300,
    direction: 'alternate',
    delay: 0,
    iterations: Infinity,
    fill: 'forwards',
};

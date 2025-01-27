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
        transform: 'translate3d(-50%, -63%, 0)',
        // transform: 'translate3d(-43px, -74px, 0)',
        offset: 0,
    },
    {
        transform: 'translate3d(-50%, -65%, 0)',
        // transform: 'translate3d(-43px, -71px, 0)',
        offset: 0.5,
    },
    {
        transform: 'translate3d(-50%, -63%, 0)',
        // transform: 'translate3d(-43px, -74px, 0)',
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
        transform: 'translate3d(-62%, 81%, 0) rotate(-21deg)',
        // transform: 'translate3d(-22px, 31px, 0) rotate(-21deg)',
        offset: 0,
    },
    {
        transform: 'translate3d(-62%, 66%, 0) rotate(19deg)',
        // transform: 'translate3d(-24px, 28px, 0) rotate(19deg)',
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
        transform: 'translate3d(-70%, 78%, 0) rotate(20deg)',
        // transform: 'translate3d(-23px, 30px, 0)  rotate(20deg)',
        offset: 0,
    },
    {
        transform: 'translate3d(-41%, 80%, 0) rotate(-21deg)',
        // transform: 'translate3d(-15px, 34px, 0) rotate(-21deg)',
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

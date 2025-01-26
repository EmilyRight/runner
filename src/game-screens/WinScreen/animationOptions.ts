export const titleKeyFrames: Keyframe[] | PropertyIndexedKeyframes = [
    { opacity: 0, transform: 'translateY(-30%)', offset: 0 },
    { opacity: 1, transform: 'translateY(0)', offset: 0.1 },
    { opacity: 1, transform: 'translateY(-5%)', offset: 0.2 },
    { opacity: 1, transform: 'translateY(0%)', offset: 0.3 },
    { opacity: 1, transform: 'translateY(0%)', offset: 1 },
];

export const titleOptions: KeyframeAnimationOptions = {
    duration: 2000,
    iterations: 1,
    fill: 'both',
};

export const imageKeyFrames: Keyframe[] | PropertyIndexedKeyframes = [
    {
        opacity: 0,
        left: '50%',
        bottom: '50%',
        transform: 'translate(-100%,  27%)',
        offset: 0,
    },
    {
        opacity: 1,
        left: '50%',
        bottom: '50%',
        transform: 'translate(-52%,  27%)',
        offset: 0.1,
    },
    {
        opacity: 1,
        left: '50%',
        bottom: '50%',
        transform: 'translate(-54%,  27%)',
        offset: 0.2,
    },
    {
        opacity: 1,
        left: '50%',
        bottom: '50%',
        transform: 'translate(-52%,  27%)',
        offset: 0.3,
    },
    {
        opacity: 1,
        left: '50%',
        bottom: '50%',
        transform: 'translate(-52%,  27%)',
        offset: 1,
    },
];

export const imageOptions: KeyframeAnimationOptions = {
    duration: 2000,
    delay: 2000,
    iterations: 1,
    fill: 'both',
};

export const labelKeyframes: Keyframe[] | PropertyIndexedKeyframes = [
    {
        opacity: 0,
        transform: 'translateY(56%) rotate(-5deg) scale(1.2)',
        offset: 0,
    },
    {
        opacity: 1,
        transform: 'translateY(56%) rotate(-5deg) scale(0.9)',
        offset: 0.3,
    },

    {
        opacity: 1,
        transform: 'translateY(56%) rotate(-5deg) scale(1)',
        offset: 0.4,
    },
    {
        opacity: 1,
        transform: 'translateY(56%) rotate(-5deg) scale(0.9)',
        offset: 0.5,
    },
    {
        opacity: 1,
        transform: 'translateY(56%) rotate(-5deg) scale(1)',
        offset: 0.6,
    },
    {
        opacity: 1,
        transform: 'translateY(56%) rotate(-5deg) scale(1)',
        offset: 1,
    },
];

export const labelOptions: KeyframeAnimationOptions = {
    duration: 2000,
    delay: 0,
    iterations: 1,
    fill: 'both',
};

export const imageFinalKeyFrames: Keyframe[] | PropertyIndexedKeyframes = [
    {
        transform: 'translate(0, 0)',
        height: '70%',
        offset: 0,
    },

    {
        transform: 'translate(0%, -151%) rotate(-7deg)',
        height: '32%',
        offset: 0.5,
    },
    // {
    //   transform: "translate(50%, -41%) rotate(-7deg)",
    //   width: "47%",
    //   offset: 0.7,
    // },
    {
        transform: 'translate(0%, -151%) rotate(-7deg)',
        height: '32%',
        offset: 1,
    },
];

export const imageFinalOptions: KeyframeAnimationOptions = {
    duration: 1800,
    iterations: 1,
    easing: 'ease-in-out',
    fill: 'both',
};

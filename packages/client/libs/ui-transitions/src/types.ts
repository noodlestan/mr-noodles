export type TransitionOptions = {
    skipInTransition?: boolean;
    skipOutTransition?: boolean;
    skipHideTransition?: boolean;
    transitionTime?: number;
};

export type TransitionStatus = 'start' | 'active' | 'end';

export type TransitionState = {
    name: string;
    options: TransitionOptions;
    status: TransitionStatus;
    timeout: number;
};

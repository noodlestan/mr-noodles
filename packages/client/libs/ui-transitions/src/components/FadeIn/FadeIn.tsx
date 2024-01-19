import { Component, JSX, createEffect, createSignal, on } from 'solid-js';

import './FadeIn.css';

type FadeInSpeed = 'slow' | 'medium' | 'fast';

export type FadeInProps = {
    children: JSX.Element;
    when?: boolean;
    delay?: number;
    speed?: FadeInSpeed;
};

const SPEEDS: Record<FadeInSpeed, number> = {
    slow: 1000,
    medium: 500,
    fast: 200,
};

const DEFAULT_SPEED: FadeInSpeed = 'fast';

const speedToDuration = (speed: FadeInSpeed | undefined) => {
    return SPEEDS[speed || DEFAULT_SPEED];
};

export const FadeIn: Component<FadeInProps> = (props): JSX.Element => {
    const [started, setStarted] = createSignal(false);

    const duration = () => speedToDuration(props.speed);

    createEffect(
        on(
            () => (props.when !== undefined ? props.when : true),
            (is, was) => {
                if (!was && is) {
                    setTimeout(() => setStarted(true), props.delay);
                }
            },
        ),
    );

    const classList = () => ({
        FadeIn: true,
        'FadeIn-start': !started(),
        'FadeIn-active': started(),
        [`FadeIn-speed-${props.speed}`]: true,
    });

    const style = () => ({
        '--fade-in-duration': `${duration()}ms`,
    });

    return (
        <div classList={classList()} style={style()}>
            {props.children}
        </div>
    );
};

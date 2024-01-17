import { Component, JSX, createEffect, createSignal, on } from 'solid-js';

import './FadeIn.css';

export type FadeInProps = {
    children: JSX.Element;
    when?: boolean;
    delay?: number;
    duration?: string;
};

export const FadeIn: Component<FadeInProps> = (props): JSX.Element => {
    const [started, setStarted] = createSignal(false);

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
    });

    const style = () => ({
        '--fade-in-duration': props.duration || '1s',
    });

    return (
        <div classList={classList()} style={style()}>
            {props.children}
        </div>
    );
};

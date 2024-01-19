import { Component, JSX, Show, batch, createEffect, createSignal, on } from 'solid-js';

import './Squeeze.css';

type SqueezeSpeed = 'slow' | 'medium' | 'fast';

export type SqueezeProps = {
    children: JSX.Element;
    when: boolean;
    delay?: number;
    speed?: SqueezeSpeed;
};

const SPEEDS: Record<SqueezeSpeed, number> = {
    slow: 1000,
    medium: 500,
    fast: 200,
};

const DEFAULT_SPEED: SqueezeSpeed = 'fast';

const speedToDuration = (speed: SqueezeSpeed | undefined) => {
    return SPEEDS[speed || DEFAULT_SPEED];
};

export const Squeeze: Component<SqueezeProps> = (props): JSX.Element => {
    let divRef: HTMLDivElement | undefined;

    const [height, setHeight] = createSignal('auto');
    const [started, setStarted] = createSignal(false);
    const [finished, setFinished] = createSignal(false);

    const delay = () => props.delay || 0;
    const duration = () => speedToDuration(props.speed);

    const reset = () =>
        batch(() => {
            setHeight('auto');
            setStarted(false);
            setFinished(false);
        });

    const doFinished = () =>
        batch(() => {
            setHeight('0px');
            setFinished(true);
        });

    const doStarted = () =>
        batch(() => {
            setHeight('0px');
            setStarted(true);
            setTimeout(doFinished, duration());
        });

    const start = () => {
        setFinished(false);
        setHeight(`${divRef?.clientHeight}px`);
        setTimeout(doStarted, delay());
    };

    createEffect(
        on(
            () => props.when,
            (is, was) => {
                if (was === undefined && is) {
                    setFinished(true);
                } else if (!was && is) {
                    start();
                } else if (was && !is) {
                    reset();
                }
            },
        ),
    );

    const classList = () => ({
        Squeeze: true,
        'Squeeze-started': started(),
        [`Squeeze-speed-${props.speed}`]: true,
    });

    const style = () => ({
        '--squeeze-height': height(),
        '--squeeze-duration': `${duration()}ms`,
    });

    return (
        <Show when={!finished()}>
            <div classList={classList()} style={style()}>
                <div ref={divRef} style={{ width: '100%' }}>
                    {props.children}
                </div>
            </div>
        </Show>
    );
};

import { Component, JSX, createEffect } from 'solid-js';

type FallbackWrapperProps = {
    fallback: JSX.Element | ((err: Error, reset?: () => void) => JSX.Element);
    onError?: (err: Error) => void;
    err: Error;
    reset?: () => void;
};

export const FallbackWrapperHandler: Component<FallbackWrapperProps> = props => {
    const isCallable = () => typeof props.fallback === 'function';
    const callbaleCallback = () =>
        typeof props.fallback === 'function' && props.fallback(props.err, props.reset);
    createEffect(() => {
        props.onError && props.onError(props.err);
    });
    return <>{isCallable() ? callbaleCallback() : props.fallback}</>;
};

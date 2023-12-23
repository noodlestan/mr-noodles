import { ErrorBoundary as Boundary, Component, JSX } from 'solid-js';

import { FallbackWrapperHandler } from './private/FallbackWrapper';

export type ErrorBoundaryProps = {
    fallback: JSX.Element | ((err: Error, reset?: () => void) => JSX.Element);
    onError?: (err: Error) => void;
    reset?: () => void;
    children?: JSX.Element;
};

export const ErrorBoundary: Component<ErrorBoundaryProps> = props => {
    return (
        <Boundary
            fallback={(err, reset) => (
                <FallbackWrapperHandler fallback={props.fallback} err={err} reset={reset} />
            )}
        >
            {props.children}
        </Boundary>
    );
};

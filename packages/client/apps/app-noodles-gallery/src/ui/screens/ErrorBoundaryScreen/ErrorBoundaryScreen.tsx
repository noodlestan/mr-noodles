import { ErrorBoundary as Boundary } from '@noodlestan/ui-error-boundary';
import { Component, JSX } from 'solid-js';

type ErrorBoundaryScreenProps = {
    children?: JSX.Element;
};

const logError = (error: Error) => {
    console.error(error);
};

export const ErrorBoundaryScreen: Component<ErrorBoundaryScreenProps> = props => {
    return (
        <Boundary fallback="ouch" onError={logError}>
            {props.children}
        </Boundary>
    );
};

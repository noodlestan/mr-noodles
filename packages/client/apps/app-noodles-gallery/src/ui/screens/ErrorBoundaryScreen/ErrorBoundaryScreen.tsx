import { ErrorBoundary as Boundary } from '@noodlestan/ui-error-boundary';
import { Component, JSX } from 'solid-js';

type ErrorBoundaryScreenProps = {
    children?: JSX.Element;
};

export const ErrorBoundaryScreen: Component<ErrorBoundaryScreenProps> = props => {
    return <Boundary fallback="ouch">{props.children}</Boundary>;
};

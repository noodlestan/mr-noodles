import { Display, Icon } from '@noodlestan/ui-atoms';
import { ErrorBoundary as Boundary } from '@noodlestan/ui-error-boundary';
import { Flex } from '@noodlestan/ui-layouts';
import { BugIcon } from 'lucide-solid';
import { Component, JSX } from 'solid-js';

import './ErrorBoundaryScreen.css';

type ErrorBoundaryScreenProps = {
    children?: JSX.Element;
};

const logError = (error: Error) => {
    console.error(error);
};

export const ErrorScreen: Component = () => {
    return (
        <div class="ErrorScreen">
            <Flex padding="l" gap="l">
                <Flex direction="row" gap="s">
                    <Icon icon={BugIcon} />
                    <Display size="xl">Ouch</Display>
                </Flex>
            </Flex>
        </div>
    );
};

export const ErrorBoundaryScreen: Component<ErrorBoundaryScreenProps> = props => {
    return (
        <Boundary fallback={ErrorScreen} onError={logError}>
            {props.children}
        </Boundary>
    );
};

import { Flex } from '@noodlestan/ui-layouts';
import { Component, JSX } from 'solid-js';

import './PageLayout.css';

type PageLayoutProps = {
    children: JSX.Element;
    classList?: { [key: string]: boolean };
};

export const PageLayout: Component<PageLayoutProps> = props => {
    const classList = () => ({
        ...props.classList,
        PageLayout: true,
    });

    return (
        <Flex align="stretch" justify="start" gap="s" classList={classList()}>
            {props.children}
        </Flex>
    );
};

import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX } from 'solid-js';

import './DemoPage.css';

type DemoPageProps = {
    title: string;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

export const DemoPage: Component<DemoPageProps> = props => {
    return (
        <Surface classList={{ DemoPage: true, ...props.classList }} tag="section" variant="page">
            <Flex padding="l" gap="m">
                <Display level={2}>{props.title}</Display>
                <Flex gap="xl">{props.children}</Flex>
            </Flex>
        </Surface>
    );
};

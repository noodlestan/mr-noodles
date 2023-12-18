import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX } from 'solid-js';

import './DemoGroup.css';

type DemoGroupProps = {
    title: string;
    classList?: { [key: string]: boolean };
    children?: JSX.Element;
};

export const DemoGroup: Component<DemoGroupProps> = props => {
    return (
        <Surface tag="section" variant="page" classList={{ DemoGroup: true, ...props.classList }}>
            <Flex gap="m">
                <Display level={3}>{props.title}</Display>
                <Flex gap="s">{props.children}</Flex>
            </Flex>
        </Surface>
    );
};

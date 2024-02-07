import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, JSX } from 'solid-js';

import './SideNav.css';

type SideNavProps = {
    classList?: { [key: string]: boolean };
    children: JSX.Element;
};

export const SideNav: Component<SideNavProps> = props => {
    const classList = () => ({
        ...props.classList,
        SideNav: true,
    });

    const containerClassList = {
        'SideNav--Container': true,
    };

    return (
        <Surface tag="nav" variant="stage" classList={classList()}>
            <Flex classList={containerClassList} padding="l">
                <Flex direction="row" padding="l" gap="m" wrap>
                    {props.children}
                </Flex>
            </Flex>
        </Surface>
    );
};

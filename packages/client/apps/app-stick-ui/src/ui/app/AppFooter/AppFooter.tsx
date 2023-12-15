import { Link } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import './AppFooter.css';

export const AppFooter: Component = () => {
    return (
        <Surface variant="inverse" classList={{ AppFooter: true }}>
            <Flex tag="footer" padding="m" direction="column">
                <Link href="https://github.com/stickfoo/">Stickfoo</Link>
            </Flex>
        </Surface>
    );
};

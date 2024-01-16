// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { FoldersQueryBar } from '../FoldersQueryBar/FoldersQueryBar';

import './FoldersBar.css';

export type FoldersBarProps = {
    foo?: 'bar';
};

export const FoldersBar: Component<FoldersBarProps> = () => {
    return (
        <Surface variant="page" classList={{ FoldersBar: true }}>
            <Flex direction="row" padding="m" gap="l" align="end">
                <FoldersQueryBar />
            </Flex>
        </Surface>
    );
};

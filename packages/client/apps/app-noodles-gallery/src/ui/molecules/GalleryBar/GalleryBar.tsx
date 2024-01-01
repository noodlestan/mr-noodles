// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { GallerySelectionBar } from '../GallerySelectionBar.tsx/GallerySelectionBar';
import { QueryBar } from '../QueryBar/QueryBar';

import './GalleryBar.css';

export type GalleryBarProps = {
    foo?: 'bar';
};

export const GalleryBar: Component<GalleryBarProps> = () => {
    return (
        <Surface variant="stage" classList={{ GalleryBar: true }}>
            <Flex direction="row" padding="m" gap="l" align="end">
                <QueryBar />
                <GallerySelectionBar />
            </Flex>
        </Surface>
    );
};

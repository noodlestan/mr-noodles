// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { GalleryQueryBar } from '../GalleryQueryBar/GalleryQueryBar';
import { GallerySelectionBar } from '../GallerySelectionBar.tsx/GallerySelectionBar';

import './GalleryBar.css';

export type GalleryBarProps = {
    foo?: 'bar';
};

export const GalleryBar: Component<GalleryBarProps> = () => {
    return (
        <Surface variant="page" classList={{ GalleryBar: true }}>
            <Flex padding="m">
                <Flex direction="row" gap="l" justify="between" align="center">
                    <GalleryQueryBar />
                    <GallerySelectionBar />
                </Flex>
            </Flex>
        </Surface>
    );
};

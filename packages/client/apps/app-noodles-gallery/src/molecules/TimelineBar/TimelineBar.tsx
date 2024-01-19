// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { GalleryQueryBar } from '../GalleryQueryBar/GalleryQueryBar';
import { GallerySelectionBar } from '../GallerySelectionBar.tsx/GallerySelectionBar';

import './TimelineBar.css';

export type TimelineBarProps = {
    foo?: 'bar';
};

export const TimelineBar: Component<TimelineBarProps> = () => {
    return (
        <Surface variant="page" classList={{ TimelineBar: true }}>
            <Flex padding="m">
                <Flex direction="row" gap="l" justify="between" align="center">
                    <GalleryQueryBar />
                    <GallerySelectionBar />
                </Flex>
            </Flex>
        </Surface>
    );
};

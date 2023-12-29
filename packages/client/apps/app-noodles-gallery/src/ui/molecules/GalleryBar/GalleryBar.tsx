// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

import { GallerySelectionBar } from '../GallerySelectionBar.tsx/GallerySelectionBar';
import { QueryBar } from '../QueryBar/QueryBar';

import './GalleryBar.css';

export type GalleryBarProps = {
    foo?: 'bar';
};

export const GalleryBar: Component<GalleryBarProps> = () => {
    const classList = () => ({
        GalleryBar: true,
    });

    return (
        <Flex direction="row" gap="m" classList={classList()}>
            <QueryBar />
            <GallerySelectionBar />
        </Flex>
    );
};

// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component } from 'solid-js';

import { AlbumsBreadcrumbs } from '../AlbumsBreadcrumbs/AlbumsBreadcrumbs';
import { AlbumsQueryBar } from '../AlbumsQueryBar/AlbumsQueryBar';

import './AlbumsBar.css';

export type AlbumsBarProps = {
    foo?: 'bar';
};

export const AlbumsBar: Component<AlbumsBarProps> = () => {
    return (
        <Surface variant="stage" classList={{ AlbumsBar: true }}>
            <Flex direction="row" padding="m" gap="l" align="end">
                <AlbumsBreadcrumbs />
                <AlbumsQueryBar />
            </Flex>
        </Surface>
    );
};

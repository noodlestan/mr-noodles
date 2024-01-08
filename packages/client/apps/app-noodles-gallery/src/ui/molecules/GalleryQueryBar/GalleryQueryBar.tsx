import type { PhotoQuery } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import './GalleryQueryBar.css';

export type GalleryQueryBarProps = {
    query?: Accessor<PhotoQuery>;
};

export const GalleryQueryBar: Component<GalleryQueryBarProps> = () => {
    const classList = () => ({
        GalleryQueryBar: true,
    });

    return <Flex classList={classList()} direction="row" gap="s" align="start" />;
};

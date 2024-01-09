import type { PhotoData } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For } from 'solid-js';

import { GalleryItem } from '@/molecules/GalleryItem/GalleryItem';
import { GalleryOptions } from '@/organisms/Gallery/types';

import './GalleryItemRow.css';

export type GalleryItemRowProps = {
    row: Accessor<PhotoData[]>;
    options: Accessor<GalleryOptions>;
};

export const GalleryItemRow: Component<GalleryItemRowProps> = props => {
    const classList = () => ({
        GalleryItemRow: true,
    });

    return (
        <Flex classList={classList()} direction="row" gap="m" align="start">
            <For each={props.row()}>{item => <GalleryItem item={item} />}</For>
        </Flex>
    );
};

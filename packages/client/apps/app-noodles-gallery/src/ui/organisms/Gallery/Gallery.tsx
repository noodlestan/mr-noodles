import type { IGroup, PhotoData, PhotoQuery } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { createGalleryGroups } from './createGalleryGroups';

import { GalleryGroupSurface } from '@/ui/molecules/GalleryGroupSurface/GalleryGroupSurface';

import './Gallery.css';

export type GalleryProps = {
    groupBy: Accessor<IGroup[]>;
    query?: Accessor<PhotoQuery>;
    items?: Accessor<PhotoData[]>;
};

export const Gallery: Component<GalleryProps> = props => {
    const classList = () => ({
        Gallery: true,
    });

    const groups = () => createGalleryGroups(props.groupBy(), props.items?.());

    return (
        <Flex classList={classList()} gap="m">
            <Show when={groups()}>
                <For each={groups()}>{group => <GalleryGroupSurface group={() => group} />}</For>
            </Show>
        </Flex>
    );
};

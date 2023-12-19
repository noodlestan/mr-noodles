import type { IGroup, PhotoData, PhotoQuery } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show, createSignal, onCleanup, onMount } from 'solid-js';

import { createGalleryGroups } from './createGalleryGroups';
import { GalleryOptions } from './types';

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

    const [rect, setRect] = createSignal({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    const handler = () => {
        setRect({ height: window.innerHeight, width: window.innerWidth });
    };

    onMount(() => {
        window.addEventListener('resize', handler);
    });

    onCleanup(() => {
        window.removeEventListener('resize', handler);
    });

    const options = (): GalleryOptions => {
        return {
            rows: {
                height: 200,
                maxItems: 6,
                maxWidth: rect().width - 100,
            },
            groupBy: props.groupBy(),
        };
    };

    const groups = () => {
        return createGalleryGroups(props.items?.(), options());
    };

    return (
        <Flex classList={classList()} gap="m">
            <Show when={groups()}>
                <For each={groups()}>
                    {group => <GalleryGroupSurface group={() => group} options={options} />}
                </For>
            </Show>
        </Flex>
    );
};

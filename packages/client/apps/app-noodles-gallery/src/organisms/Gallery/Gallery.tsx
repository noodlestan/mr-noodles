import type { IGroup, PhotoModel, PhotoQuery } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { createElementSize } from '@solid-primitives/resize-observer';
import { Accessor, Component, For, Show, createSignal } from 'solid-js';

import { createGalleryGroups } from './private/createGalleryGroups';
import { GalleryOptions } from './types';

import { GalleryGroupSurface } from '@/molecules/GalleryGroupSurface/GalleryGroupSurface';

import './Gallery.css';

export type GalleryProps = {
    groupBy: Accessor<IGroup[]>;
    query?: Accessor<PhotoQuery>;
    items?: Accessor<PhotoModel[]>;
};

export const Gallery: Component<GalleryProps> = props => {
    const [ref, setRef] = createSignal<HTMLDivElement | undefined>();
    const size = createElementSize(ref);

    const options = (): GalleryOptions => {
        return {
            rows: {
                height: 200,
                maxItems: 6,
                maxWidth: size?.width || 0,
                showCheckboxes: true,
            },
            groupBy: props.groupBy(),
        };
    };

    const groups = () => {
        return createGalleryGroups(props.items?.(), options());
    };

    const classList = () => ({
        Gallery: true,
    });

    return (
        <div classList={classList()}>
            <div class="Gallery--width">
                <div ref={setRef} />
            </div>
            <Show when={groups()}>
                <Flex gap="m">
                    <For each={groups()}>
                        {group => <GalleryGroupSurface group={() => group} options={options} />}
                    </For>
                </Flex>
            </Show>
        </div>
    );
};

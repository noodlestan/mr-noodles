import { PhotoData } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { GalleryItemRow } from '../GalleryItemRow/GalleryItemRow';

import './GalleryItemRows.css';

export type GalleryItemRowsProps = {
    rows: Accessor<PhotoData[][]>;
};

export const GalleryItemRows: Component<GalleryItemRowsProps> = props => {
    const classList = () => ({
        GalleryItemRows: true,
    });

    return (
        <Flex classList={classList()} gap="m" align="start" direction="column">
            <Show when={props.rows}>
                <For each={props.rows && props.rows()}>
                    {row => <GalleryItemRow row={() => row} />}
                </For>
            </Show>
        </Flex>
    );
};

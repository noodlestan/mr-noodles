import type { PhotoData } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { GalleryItemRow } from '@/molecules/GalleryItemRow/GalleryItemRow';
import { GalleryRowOptions } from '@/organisms/Gallery/types';

import './GalleryItemRows.css';

export type GalleryItemRowsProps = {
    rows: Accessor<PhotoData[][]>;
    options: Accessor<GalleryRowOptions>;
};

export const GalleryItemRows: Component<GalleryItemRowsProps> = props => {
    const classList = () => ({
        GalleryItemRows: true,
    });

    const style = () => {
        return {
            '--gallery-row-height': `${props.options().height}px`,
        };
    };

    return (
        <div style={style()}>
            <Flex classList={classList()} gap="m" align="start" direction="column">
                <Show when={props.rows}>
                    <For each={props.rows()}>
                        {row => <GalleryItemRow row={() => row} options={props.options} />}
                    </For>
                </Show>
            </Flex>
        </div>
    );
};

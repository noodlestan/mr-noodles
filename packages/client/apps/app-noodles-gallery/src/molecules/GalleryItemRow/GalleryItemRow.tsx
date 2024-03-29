import type { FileNoodle } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For } from 'solid-js';

import { GalleryItem } from '@/molecules/GalleryItem/GalleryItem';
import { GalleryRowOptions } from '@/organisms/Gallery/types';

import './GalleryItemRow.css';

export type GalleryItemRowProps = {
    row: Accessor<FileNoodle[]>;
    options: Accessor<GalleryRowOptions>;
};

export const GalleryItemRow: Component<GalleryItemRowProps> = props => {
    const classList = () => ({
        GalleryItemRow: true,
    });

    return (
        <Flex classList={classList()} direction="row" gap="m" align="start" wrap>
            <For each={props.row()}>
                {item => <GalleryItem item={item} showCheckbox={props.options().showCheckboxes} />}
            </For>
        </Flex>
    );
};

import { PhotoData } from '@noodlestan/shared-types';
import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For } from 'solid-js';

import './GalleryItemRow.css';

export type GalleryItemRowProps = {
    row: Accessor<PhotoData[]>;
};

export const GalleryItemRow: Component<GalleryItemRowProps> = props => {
    const classList = () => ({
        GalleryItemRow: true,
    });

    return (
        <Flex classList={classList()} direction="row" gap="m" align="start">
            <For each={props.row && props.row()}>
                {item => {
                    const date = item.date ? new Date(item.date).toString() : '';
                    return (
                        <Flex gap="m" classList={{ GalleryItem: true }}>
                            <img
                                alt=""
                                src={
                                    item.thumb ||
                                    `http://localhost:8008/photos/${item.id}/thumb?h=200`
                                }
                            />
                            <Text size="s">Date:{date}</Text>
                        </Flex>
                    );
                }}
            </For>
        </Flex>
    );
};

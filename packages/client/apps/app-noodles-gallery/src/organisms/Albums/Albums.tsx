import type { AlbumData } from '@noodlestan/shared-types';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { AlbumListItem } from '@/molecules/AlbumListItem/AlbumListItem';

import './Albums.css';

export type AlbumsProps = {
    items?: Accessor<AlbumData[]>;
};

export const Albums: Component<AlbumsProps> = props => {
    const classList = () => ({
        Albums: true,
    });

    // const options = (): AlbumsOptions => {
    //     return {
    //         rows: {
    //             height: 200,
    //             maxItems: 6,
    //             maxWidth: rect().width - 100,
    //         },
    //     };
    // };

    // const groups = () => {
    //     return createAlbumRows(props.items?.(), options());
    // };

    const items = () => props.items?.();

    return (
        <Flex classList={classList()} gap="m" wrap direction="row">
            <Show when={items()}>
                <For each={items()}>{item => <AlbumListItem item={item} />}</For>
            </Show>
        </Flex>
    );
};

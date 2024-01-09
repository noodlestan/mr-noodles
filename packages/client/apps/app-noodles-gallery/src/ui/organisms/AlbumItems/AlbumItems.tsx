import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, For, Show } from 'solid-js';

import './AlbumItems.css';

export type AlbumItemsProps = {
    album: string;
};

export const AlbumItems: Component<AlbumItemsProps> = () => {
    const classList = () => ({
        AlbumItems: true,
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

    const items = () => ['asd'];

    return (
        <Show when={items()}>
            <Surface variant="card">
                <Flex classList={classList()} padding="m" gap="m" wrap direction="row">
                    <For each={items()}>
                        {item => (
                            <>
                                <Display size="s">{item}</Display>
                            </>
                        )}
                    </For>
                </Flex>
            </Surface>
        </Show>
    );
};

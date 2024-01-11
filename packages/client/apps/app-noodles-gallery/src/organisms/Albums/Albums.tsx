import type { AlbumData } from '@noodlestan/shared-types';
import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For, Show } from 'solid-js';

import { AlbumCard } from '@/molecules/AlbumCard/AlbumCard';
import { useAlbumsNavigationContext } from '@/providers/AlbumsNavigation';

import './Albums.css';

export type AlbumsProps = {
    items?: Accessor<AlbumData[]>;
};

export const Albums: Component<AlbumsProps> = props => {
    const { bus } = useAlbumsNavigationContext();

    const items = () => props.items?.();

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'ArrowLeft') {
            bus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            bus?.emit({ name: 'goToNextItem' });
        }
    };

    const classList = () => ({
        Albums: true,
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={handleKeyDown}>
            <Show when={items()?.length}>
                <Flex classList={classList()} gap="m" wrap direction="column">
                    <Display level={4}>{items()?.length} Subfolders</Display>
                    <Flex gap="m" wrap direction="row">
                        <For each={items()}>{item => <AlbumCard item={item} />}</For>
                    </Flex>
                </Flex>
            </Show>
        </div>
    );
};

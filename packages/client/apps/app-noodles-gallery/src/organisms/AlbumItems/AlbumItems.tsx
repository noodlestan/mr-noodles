import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { SkeletonImage, SkeletonText } from '@noodlestan/ui-skeletons';
import { Surface } from '@noodlestan/ui-surfaces';
import { createElementSize } from '@solid-primitives/resize-observer';
import { ChevronDown, X } from 'lucide-solid';
import { Component, For, Show, createSignal } from 'solid-js';

import { makeRows } from '../Gallery/private/utils/makeRows';

import { GalleryItem } from '@/molecules/GalleryItem/GalleryItem';
import { GalleryItemRows } from '@/molecules/GalleryItemRows/GalleryItemRows';
import { useAlbumsNavigationContext } from '@/providers/AlbumsNavigation';
import { createPhotosResource } from '@/resources/Photo/createPhotosResource';

import './AlbumItems.css';

export type AlbumItemsProps = {
    album: string;
    showAllItems: boolean;
    toggleVisibility: boolean;
};

export const AlbumItems: Component<AlbumItemsProps> = props => {
    const [ref, setRef] = createSignal<HTMLDivElement | undefined>();
    const size = createElementSize(ref);

    const query = () => ({ filterBy: { album: props.album } });
    const [resource] = createPhotosResource(query);
    const { bus } = useAlbumsNavigationContext();

    const data = () => (props.album ? resource()?.data : undefined);

    const rows = () => {
        const items = data();
        if (items && items.length) {
            const rows = makeRows(items, { height: 200, maxWidth: size.width || undefined });
            return rows[0].length ? rows : [[items[0]]];
        }
        return [[]];
    };

    const length = () => data()?.length || 0;
    const isTruncated = () => !resource.loading && length() > rows()[0].length;

    const rowOptions = () => ({
        height: 200,
        showCheckboxes: false,
    });

    const showFirstRow = () => !resource.loading && props.toggleVisibility && !props.showAllItems;
    const showAllRows = () => (!resource.loading && !props.toggleVisibility) || props.showAllItems;

    const handleExpandClick = () => bus?.emit({ name: 'showAllItems' });
    const handleCloseClick = () => bus?.emit({ name: 'showSubFolders' });

    const classList = () => ({
        AlbumItems: true,
    });

    return (
        <div classList={classList()}>
            <div class="AlbumItems--width">
                <div ref={setRef} />
            </div>
            <Surface variant="card">
                <Flex gap="m" padding="m" classList={{ 'AlbumItems--flex': true }}>
                    <Flex gap="s" wrap direction="row" align="center" justify="between">
                        <Display level={4}>
                            <Show when={resource.loading}>
                                <SkeletonText size="m" />
                            </Show>
                            <Show when={!resource.loading}>{length()} photos</Show>
                        </Display>
                        <Show when={props.toggleVisibility && isTruncated()}>
                            <Show when={!props.showAllItems}>
                                <IconButton
                                    size="s"
                                    variant="plain"
                                    onClick={handleExpandClick}
                                    icon={ChevronDown}
                                />
                            </Show>
                            <Show when={props.showAllItems}>
                                <IconButton
                                    size="s"
                                    variant="plain"
                                    onClick={handleCloseClick}
                                    icon={X}
                                />
                            </Show>
                        </Show>
                    </Flex>
                    <Show when={resource.loading}>
                        <SkeletonImage width="266px" height="200px" />
                    </Show>
                    <Show when={showFirstRow()}>
                        <Flex
                            gap="s"
                            wrap
                            direction="row"
                            classList={{ 'AlbumItems--first-row': true }}
                        >
                            <For each={rows()[0]}>{item => <GalleryItem item={item} />}</For>
                        </Flex>
                    </Show>
                    <Show when={showAllRows()}>
                        <GalleryItemRows rows={rows} options={rowOptions} />
                    </Show>
                </Flex>
            </Surface>
        </div>
    );
};

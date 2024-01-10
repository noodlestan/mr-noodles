import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { SkeletonImage, SkeletonText } from '@noodlestan/ui-skeletons';
import { Surface } from '@noodlestan/ui-surfaces';
import { createElementSize } from '@solid-primitives/resize-observer';
import { ChevronDown, X } from 'lucide-solid';
import { Component, Show, createSignal } from 'solid-js';

import { makeRows } from '../Gallery/private/utils/makeRows';

import { GalleryItemRows } from '@/molecules/GalleryItemRows/GalleryItemRows';
import { useAlbumsNavigationContext } from '@/providers/AlbumsNavigation';
import { GalleryNavigationProvider } from '@/providers/GalleryNavigation';
import { createPhotosResource } from '@/resources/Photo/createPhotosResource';
import { GalleryNavigationService } from '@/services/GalleryNavigation';

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

    const data = () => (props.album ? resource()?.data || [] : []);
    const allRows = () => {
        const items = data();
        if (items && items.length) {
            return makeRows(items, { height: 200, maxWidth: size.width || undefined });
        }
        return [[]];
    };

    const length = () => data()?.length || 0;
    const firstRow = () => allRows()[0];
    const isTruncated = () => length() > firstRow().length;
    const showToggleVisibility = () => props.toggleVisibility && isTruncated();
    const showFirstRow = () => props.toggleVisibility && !props.showAllItems;
    const rows = () => (showFirstRow() ? [allRows()[0]] : allRows());

    const handleExpandClick = () => bus?.emit({ name: 'showAllItems' });
    const handleCloseClick = () => bus?.emit({ name: 'showSubFolders' });

    const classList = () => ({
        AlbumItems: true,
    });

    const rowOptions = () => ({
        height: 200,
        showCheckboxes: false,
    });

    const { createGalleryNavigationContext } = inject(GalleryNavigationService);
    const galleryNavigationContext = createGalleryNavigationContext(() =>
        showFirstRow() ? rows()[0] : data(),
    );

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
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
                        <Show when={showToggleVisibility()}>
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

                    <GalleryNavigationProvider context={galleryNavigationContext}>
                        <GalleryItemRows rows={rows} options={rowOptions} />
                    </GalleryNavigationProvider>
                </Flex>
            </Surface>
        </div>
    );
};

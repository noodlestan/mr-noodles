import type { APIResponse, FileNoodle } from '@noodlestan/shared-types';
import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { SkeletonImage, SkeletonText } from '@noodlestan/ui-skeletons';
import { createElementSize } from '@solid-primitives/resize-observer';
import { ChevronDown, X } from 'lucide-solid';
import { Component, Resource, Show, createSignal } from 'solid-js';

import { makeRows } from '../Gallery/private/utils/makeRows';
import { ModalView } from '../ModalView/ModalView';

import { GalleryItemRows } from '@/molecules/GalleryItemRows/GalleryItemRows';
import { useFoldersNavigationContext } from '@/providers/FoldersNavigation';
import {
    GalleryNavigationProvider,
    createGalleryNavigationContext,
} from '@/providers/GalleryNavigation';

import './FolderItems.css';

export type FolderItemsProps = {
    folder: string;
    items: Resource<APIResponse<FileNoodle[]>>;
    showAllItems: boolean;
    toggleVisibility: boolean;
};

export const FolderItems: Component<FolderItemsProps> = props => {
    const [ref, setRef] = createSignal<HTMLDivElement | undefined>();
    const size = createElementSize(ref);
    const { bus } = useFoldersNavigationContext();

    const data = () => (props.folder ? props.items()?.data || [] : []);

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

    const galleryNavigationContext = createGalleryNavigationContext(() =>
        showFirstRow() ? rows()[0] : data(),
    );
    const { bus: galleryNavigationBus, current, isModal } = galleryNavigationContext;

    const handleExpandClick = () => bus?.emit({ name: 'showAllItems' });
    const handleCloseClick = () => bus?.emit({ name: 'showSubFolders' });
    const handleModalClose = () => galleryNavigationBus?.emit({ name: 'closeModal' });

    const rowOptions = () => ({
        height: 200,
        showCheckboxes: false,
    });

    const classList = () => ({
        FolderItems: true,
    });

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div classList={classList()}>
            <div class="FolderItems--Width">
                <div ref={setRef} />
            </div>
            <Flex gap="m" classList={{ 'FolderItems--Flex': true }}>
                <Flex gap="s" wrap direction="row" align="center" justify="between">
                    <Display level={4}>
                        <Show when={props.items.loading}>
                            <SkeletonText size="m" />
                        </Show>
                        <Show when={!props.items.loading}>{length()} items</Show>
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
                <Show when={props.items.loading}>
                    <SkeletonImage width="266px" height="200px" />
                </Show>

                <GalleryNavigationProvider {...galleryNavigationContext}>
                    <GalleryItemRows rows={rows} options={rowOptions} />
                    <ModalView show={isModal() && !!current()} onClose={handleModalClose} />
                </GalleryNavigationProvider>
            </Flex>
        </div>
    );
};

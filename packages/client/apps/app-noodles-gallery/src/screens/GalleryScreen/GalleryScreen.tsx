import type { IGroup, ISort } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, Show, createRenderEffect } from 'solid-js';

import { galleryStore } from './private/store';

import { GalleryBar } from '@/molecules/GalleryBar/GalleryBar';
import { GalleryScroll } from '@/molecules/GalleryScroll/GalleryScroll';
import { Gallery } from '@/organisms/Gallery/Gallery';
import { ModalView } from '@/organisms/ModalView/ModalView';
import {
    GalleryNavigationProvider,
    createGalleryNavigationContext,
} from '@/providers/GalleryNavigation';
import {
    GallerySelectionProvider,
    createGallerySelectionContext,
} from '@/providers/GallerySelection';
import { PhotosService } from '@/services/Photos';

import './GalleryScreen.css';

const groupByToSortBy = (group: IGroup[]): ISort[] => {
    return group.map(({ field, dir }) => {
        return { field, dir };
    });
};

export const GalleryScreen: Component = () => {
    const { loading, photos, query, setQuery } = inject(PhotosService);
    const { groupBy, setGroupBy, sortBy } = galleryStore;

    const sort = () => groupByToSortBy(groupBy());

    const selectionContext = createGallerySelectionContext();
    const navigationContext = createGalleryNavigationContext(photos);
    const { bus: navigationBus, isModal, current } = navigationContext;

    createRenderEffect(() => {
        setGroupBy([
            { field: 'date', group: 'day', dir: 'desc' },
            { field: 'album', dir: 'asc' },
        ]);

        setQuery({
            sortBy: [...sort(), ...sortBy()],
        });
    });

    const handleModalClose = () => navigationBus?.emit({ name: 'closeModal' });

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main tab-index="0">
            <GalleryNavigationProvider {...navigationContext}>
                <GallerySelectionProvider {...selectionContext}>
                    <Surface variant="page" classList={{ GalleryScreen: true }}>
                        <GalleryBar />
                        <GalleryScroll>
                            <Show when={loading()}>Loading</Show>
                            <Show when={!loading()}>
                                <Gallery items={photos} groupBy={groupBy} query={query} />
                            </Show>
                        </GalleryScroll>
                        <ModalView show={isModal() && !!current()} onClose={handleModalClose} />
                    </Surface>
                </GallerySelectionProvider>
            </GalleryNavigationProvider>
        </main>
    );
};

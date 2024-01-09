import type { IGroup, ISort } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Component, Show, createRenderEffect } from 'solid-js';

import { galleryStore } from './private/store';

import { GalleryBar } from '@/molecules/GalleryBar/GalleryBar';
import { GalleryScroll } from '@/molecules/GalleryScroll/GalleryScroll';
import { Gallery } from '@/organisms/Gallery/Gallery';
import { ModalView } from '@/organisms/ModalView/ModalView';
import { GalleryNavigationProvider } from '@/providers/GalleryNavigation';
import { GallerySelectionProvider } from '@/providers/GallerySelection';
import { GalleryNavigationService } from '@/services/GalleryNavigation';
import { GallerySelectionService } from '@/services/GallerySelection';
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

    const { createSelectionContext } = inject(GallerySelectionService);
    const selectionContext = createSelectionContext();

    const { createNavigationContext } = inject(GalleryNavigationService);
    const navigationContext = createNavigationContext(photos);
    const { bus: navigationBus, isModal, current } = navigationContext;

    createRenderEffect(() => {
        setGroupBy([
            { field: 'album', dir: 'asc' },
            { field: 'date', group: 'day', dir: 'desc' },
        ]);

        setQuery({
            sortBy: [...sort(), ...sortBy()],
        });
    });

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Escape') {
            navigationBus?.emit({ name: 'closeModal' });
        }
        if (ev.code === 'ArrowLeft') {
            navigationBus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            navigationBus?.emit({ name: 'goToNextItem' });
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main tab-index="0" onKeyDown={handleKeyDown}>
            <GalleryNavigationProvider context={navigationContext}>
                <GallerySelectionProvider context={selectionContext}>
                    <div class="GalleryScreen">
                        <GalleryBar />
                        <GalleryScroll>
                            <Show when={loading()}>Loading</Show>
                            <Show when={!loading()}>
                                <Gallery items={photos} groupBy={groupBy} query={query} />
                            </Show>
                        </GalleryScroll>
                        <ModalView show={isModal() && !!current()} />
                    </div>
                </GallerySelectionProvider>
            </GalleryNavigationProvider>
        </main>
    );
};

import type { IGroup, ISort } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Component, Show, createRenderEffect } from 'solid-js';

import { galleryStore } from './private/store';

import { PhotosService } from '@/services/Photos';
import { GalleryBar } from '@/ui/molecules/GalleryBar/GalleryBar';
import { Gallery } from '@/ui/organisms/Gallery/Gallery';
import { ModalView } from '@/ui/organisms/ModalView/ModalView';
import { GallerySelectionProvider } from '@/ui/providers/GallerySelection/GallerySelection';
import { GallerySelectionService } from '@/ui/services/GallerySelection';

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
    const selectionContext = createSelectionContext(photos);
    const { bus, isModal, current } = selectionContext;

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
        if (ev.code === 'ArrowLeft') {
            bus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            bus?.emit({ name: 'goToNextItem' });
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main tab-index="0" onKeyDown={handleKeyDown}>
            <GallerySelectionProvider context={selectionContext}>
                <GalleryBar />
                <Show when={loading()}>Loading</Show>
                <Show when={!loading()}>
                    <Gallery items={photos} groupBy={groupBy} query={query} />
                </Show>
                <ModalView show={isModal() && !!current()} />
            </GallerySelectionProvider>
        </main>
    );
};

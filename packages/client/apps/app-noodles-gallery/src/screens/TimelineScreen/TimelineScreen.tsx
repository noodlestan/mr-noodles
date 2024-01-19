/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import type { IGroup, ISort } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, Show, createRenderEffect, onMount } from 'solid-js';

import { galleryStore } from './private/store';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { GalleryScroll } from '@/molecules/GalleryScroll/GalleryScroll';
import { TimelineBar } from '@/molecules/TimelineBar/TimelineBar';
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
import { AppService } from '@/services/App';
import { FilesService } from '@/services/Files';

import './TimelineScreen.css';

const groupByToSortBy = (group: IGroup[]): ISort[] => {
    return group.map(({ field, dir }) => {
        return { field, dir };
    });
};

export const TimelineScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { ready } = inject(AppService);
    const { loading, files, query, setQuery } = inject(FilesService);
    const { groupBy, setGroupBy, sortBy } = galleryStore;

    const sort = () => groupByToSortBy(groupBy());

    const selectionContext = createGallerySelectionContext();
    const navigationContext = createGalleryNavigationContext(files);
    const { bus: navigationBus, isModal, current } = navigationContext;

    createRenderEffect(() => {
        // TODO errors here are caught by ErrorBoundary, but errors in the resource fetyching no
        setGroupBy([
            { field: 'date', group: 'day', dir: 'desc' },
            { field: 'folder', dir: 'asc' },
        ]);

        setQuery({
            sortBy: [...sort(), ...sortBy()],
        });
    });

    onMount(() => window.setTimeout(() => mainRef?.focus()));

    const handleModalClose = () => navigationBus?.emit({ name: 'closeModal' });

    return (
        <main tabindex="0" ref={mainRef} classList={{ TimelineScreen: true }}>
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>
                <GalleryNavigationProvider {...navigationContext}>
                    <GallerySelectionProvider {...selectionContext}>
                        <Surface variant="stage">
                            <TimelineBar />
                            <GalleryScroll>
                                <Show when={loading()}>Loading</Show>
                                <Show when={!loading()}>
                                    <Gallery items={files} groupBy={groupBy} query={query} />
                                </Show>
                            </GalleryScroll>
                            <ModalView show={isModal() && !!current()} onClose={handleModalClose} />
                        </Surface>
                    </GallerySelectionProvider>
                </GalleryNavigationProvider>
            </Show>
        </main>
    );
};

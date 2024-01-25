/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Component, Show, onMount } from 'solid-js';

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

export const TimelineScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { ready } = inject(AppService);
    // TODO move to createTimelineScreenContext(groupBy, query) <- arguments are in the createRenderEffect() below
    const { loading, files, query } = inject(FilesService);
    const { groupBy } = galleryStore;

    const selectionContext = createGallerySelectionContext();
    const navigationContext = createGalleryNavigationContext(files);
    const { bus: navigationBus, isModal, current } = navigationContext;

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

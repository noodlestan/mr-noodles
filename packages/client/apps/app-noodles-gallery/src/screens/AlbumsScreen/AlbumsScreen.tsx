import { inject } from '@noodlestan/ui-services';
import { useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect, on } from 'solid-js';

import { AlbumsBar } from '@/molecules/AlbumsBar/AlbumsBar';
import { AlbumsScroll } from '@/molecules/AlbumsScroll/AlbumsScroll';
import { AlbumItems } from '@/organisms/AlbumItems/AlbumItems';
import { Albums } from '@/organisms/Albums/Albums';
import { AlbumsNavigationProvider } from '@/providers/AlbumsNavigation';
import { AlbumsQueryProvider } from '@/providers/AlbumsQuery';
import { AlbumsService } from '@/services/Albums';
import { AlbumsNavigationService } from '@/services/AlbumsNavigation';
import { AlbumsQueryService } from '@/services/AlbumsQuery';

import './AlbumsScreen.css';

export const AlbumsScreen: Component = () => {
    const { albums, searchAlbums, loading } = inject(AlbumsService);

    const { createNavigationContext } = inject(AlbumsNavigationService);
    const navigationContext = createNavigationContext(albums);
    const { bus, showAllItems } = navigationContext;

    const params = useParams();
    const [searchParams] = useSearchParams();
    const { createQueryContext } = inject(AlbumsQueryService);
    const queryContext = createQueryContext(params.parent, searchParams.search);

    createEffect(() => {
        const parent = params.parent;
        const { setParent } = queryContext;
        setParent(parent);
    });

    createEffect(() => {
        const search = searchParams.search;
        const { setSearchTerms } = queryContext;
        setSearchTerms(search);
    });

    createEffect(
        on(
            () => params.parent,
            (value, previous) => {
                if (value !== previous) {
                    bus.emit({ name: 'showSubFolders' });
                }
            },
        ),
    );

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Escape') {
            bus?.emit({ name: 'closeModal' });
        }
        if (ev.code === 'ArrowLeft') {
            bus?.emit({ name: 'goToPreviousItem' });
        }
        if (ev.code === 'ArrowRight') {
            bus?.emit({ name: 'goToNextItem' });
        }
    };

    const filteredAlbums = () => searchAlbums(params.parent || '', searchParams.search);

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main tab-index="0" onKeyDown={handleKeyDown}>
            <AlbumsNavigationProvider context={navigationContext}>
                <AlbumsQueryProvider context={queryContext}>
                    <div class="AlbumsScreen">
                        <AlbumsBar />
                        <AlbumsScroll>
                            <Show when={loading()}>Loading</Show>
                            <Show when={!loading()}>
                                <Show when={params.parent}>
                                    <AlbumItems
                                        album={params.parent}
                                        toggleVisibility={!filteredAlbums().length}
                                        showAllItems={showAllItems()}
                                    />
                                </Show>
                                <Show when={!showAllItems()}>
                                    <Albums items={filteredAlbums} />
                                </Show>
                            </Show>
                        </AlbumsScroll>
                        {/* <ModalView show={isModal() && !!current()} /> */}
                    </div>
                </AlbumsQueryProvider>
            </AlbumsNavigationProvider>
        </main>
    );
};
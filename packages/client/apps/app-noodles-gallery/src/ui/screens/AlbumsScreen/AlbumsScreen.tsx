import { inject } from '@noodlestan/ui-services';
import { useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect } from 'solid-js';

import { AlbumsService } from '@/services/Albums';
import { AlbumsBar } from '@/ui/molecules/AlbumsBar/AlbumsBar';
import { AlbumsScroll } from '@/ui/molecules/AlbumsScroll/AlbumsScroll';
import { AlbumItems } from '@/ui/organisms/AlbumItems/AlbumItems';
import { Albums } from '@/ui/organisms/Albums/Albums';
import { AlbumsNavigationProvider } from '@/ui/providers/AlbumsNavigation';
import { AlbumsQueryProvider } from '@/ui/providers/AlbumsQuery';
import { AlbumsNavigationService } from '@/ui/services/AlbumsNavigation';
import { AlbumsQueryService } from '@/ui/services/AlbumsQuery';

import './AlbumsScreen.css';

export const AlbumsScreen: Component = () => {
    const { albums, searchAlbums, loading } = inject(AlbumsService);

    const { createNavigationContext } = inject(AlbumsNavigationService);
    const navigationContext = createNavigationContext(albums);
    const { bus } = navigationContext;

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
                                <AlbumItems album={params.parent} />
                                <Albums items={filteredAlbums} />
                            </Show>
                        </AlbumsScroll>
                        {/* <ModalView show={isModal() && !!current()} /> */}
                    </div>
                </AlbumsQueryProvider>
            </AlbumsNavigationProvider>
        </main>
    );
};

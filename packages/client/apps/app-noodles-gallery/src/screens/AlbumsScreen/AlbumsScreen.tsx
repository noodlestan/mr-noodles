import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect, on } from 'solid-js';

import { AlbumsBar } from '@/molecules/AlbumsBar/AlbumsBar';
import { AlbumsBreadcrumbs } from '@/molecules/AlbumsBreadcrumbs/AlbumsBreadcrumbs';
import { AlbumsScroll } from '@/molecules/AlbumsScroll/AlbumsScroll';
import { AlbumItems } from '@/organisms/AlbumItems/AlbumItems';
import { Albums } from '@/organisms/Albums/Albums';
import {
    AlbumsNavigationProvider,
    createAlbumsNavigationContext,
} from '@/providers/AlbumsNavigation';
import { AlbumsQueryProvider } from '@/providers/AlbumsQuery';
import { AlbumsService } from '@/services/Albums';
import { AlbumsQueryService } from '@/services/AlbumsQuery';

import './AlbumsScreen.css';

export const AlbumsScreen: Component = () => {
    const { searchAlbums, loading } = inject(AlbumsService);

    const params = useParams();
    const [searchParams] = useSearchParams();
    const { createQueryContext } = inject(AlbumsQueryService);
    const queryContext = createQueryContext(params.parent, searchParams.search);

    const subFolders = () => searchAlbums(params.parent || '', searchParams.search);
    const navigationContext = createAlbumsNavigationContext(subFolders);
    const { bus, showAllItems } = navigationContext;

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

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main tab-index="0">
            <AlbumsNavigationProvider {...navigationContext}>
                <AlbumsQueryProvider context={queryContext}>
                    <Surface variant="page" classList={{ AlbumsScreen: true }}>
                        <AlbumsBar />
                        <AlbumsScroll>
                            <Show when={loading()}>Loading</Show>
                            <Show when={!loading()}>
                                <AlbumsBreadcrumbs />
                                <Show when={params.parent}>
                                    <AlbumItems
                                        album={params.parent}
                                        toggleVisibility={subFolders().length > 0}
                                        showAllItems={showAllItems()}
                                    />
                                </Show>
                                <Show when={!showAllItems()}>
                                    <Albums items={subFolders} />
                                </Show>
                            </Show>
                        </AlbumsScroll>
                    </Surface>
                </AlbumsQueryProvider>
            </AlbumsNavigationProvider>
        </main>
    );
};

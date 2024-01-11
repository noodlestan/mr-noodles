import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect, on } from 'solid-js';

import { AlbumsBar } from '@/molecules/AlbumsBar/AlbumsBar';
import { AlbumsBreadcrumbs } from '@/molecules/AlbumsBreadcrumbs/AlbumsBreadcrumbs';
import { AlbumsScroll } from '@/molecules/AlbumsScroll/AlbumsScroll';
import { useUrl } from '@/navigation/useUrl';
import { AlbumDetails } from '@/organisms/AlbumDetails/AlbumDetails';
import { AlbumItems } from '@/organisms/AlbumItems/AlbumItems';
import { Albums } from '@/organisms/Albums/Albums';
import {
    AlbumsNavigationProvider,
    createAlbumsNavigationContext,
} from '@/providers/AlbumsNavigation';
import { AlbumsQueryProvider } from '@/providers/AlbumsQuery';
import { createPhotosResource } from '@/resources/Photo/createPhotosResource';
import { AlbumsService } from '@/services/Albums';
import { AlbumsQueryService } from '@/services/AlbumsQuery';

import './AlbumsScreen.css';

export const AlbumsScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

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
                    // TODO invstigate better: the setTimeout was needed here because when navigation via links browser sets focus on <body> element
                    window.setTimeout(() => {
                        mainRef?.focus();
                    });
                }
            },
        ),
    );

    const query = () => ({ filterBy: { album: params.parent } });
    const [resource] = createPhotosResource(query);

    const rootUrl = () => useUrl(searchParams, '/folders');
    const parentUrl = () => {
        if (params.parent) {
            const parts = params.parent.split('/');
            const slug = parts.slice(0, -1).join('/');
            return useUrl(searchParams, `/folders/${slug}`);
        } else {
            return rootUrl();
        }
    };
    const navigate = useNavigate();

    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Escape' || ev.code === 'Backspace') {
            navigate(parentUrl());
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabindex="0"
            onKeyDown={handleKeyDown}
            ref={mainRef}
            classList={{ AlbumsScreen: true }}
        >
            <AlbumsNavigationProvider {...navigationContext}>
                <AlbumsQueryProvider context={queryContext}>
                    <Surface variant="page">
                        <AlbumsBar />
                        <AlbumsScroll>
                            <Show when={loading()}>Loading</Show>
                            <Show when={!loading()}>
                                <AlbumsBreadcrumbs />
                                <Show when={params.parent}>
                                    <AlbumDetails album={params.parent} items={resource} />
                                    <AlbumItems
                                        album={params.parent}
                                        items={resource}
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

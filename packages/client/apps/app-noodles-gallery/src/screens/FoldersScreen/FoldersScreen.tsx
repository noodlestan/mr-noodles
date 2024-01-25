/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { inject } from '@noodlestan/ui-services';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, batch, createEffect, createMemo, on } from 'solid-js';

import { FoldersHomePage } from './pages/FoldersHomePage';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { useUrl } from '@/navigation/useUrl';
import { useCurrentUserContext } from '@/providers/CurrentUser';
import {
    FoldersNavigationProvider,
    createFoldersNavigationContext,
} from '@/providers/FoldersNavigation';
import { FoldersQueryProvider } from '@/providers/FoldersQuery';
import { createFoldersQueryContext } from '@/providers/FoldersQuery/createFoldersQueryContext';
import {
    GallerySelectionProvider,
    createGallerySelectionContext,
} from '@/providers/GallerySelection';
import { AppService } from '@/services/App';
import { FoldersService } from '@/services/Folders';

import './FoldersScreen.css';

export const FoldersScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { ready } = inject(AppService);
    const { searchFolders, loading: loadingFolders } = inject(FoldersService);

    const { currentUserId } = useCurrentUserContext();

    const params = useParams();
    const [searchParams] = useSearchParams();
    const foldersQueryContext = createFoldersQueryContext(
        params.root,
        params.parent ? `/${decodeURIComponent(params.parent)}` : undefined,
        searchParams.search,
    );
    const { root, parent, textSearch } = foldersQueryContext;
    const selectionContext = createGallerySelectionContext();

    const subFolders = createMemo(() => {
        const ownerId = currentUserId();
        return searchFolders(ownerId, root(), parent(), textSearch());
    });

    const navigationContext = createFoldersNavigationContext(subFolders);
    const { bus } = navigationContext;

    createEffect(() => {
        const { setRoot, setParent, setTextSearch } = foldersQueryContext;
        batch(() => {
            setRoot(params.root);
            setParent(params.parent ? `/${decodeURIComponent(params.parent)}` : undefined);
            setTextSearch(searchParams.search);
        });
    });

    createEffect(
        on(
            () => params.parent,
            (is, was) => {
                if (is !== was) {
                    bus.emit({ name: 'showSubFolders' });
                    // TODO invstigate better: the setTimeout was needed here because when navigation via links browser sets focus on <body> element
                    window.setTimeout(() => {
                        mainRef?.focus();
                    });
                }
            },
        ),
    );

    const rootUrl = () => useUrl(searchParams, '/folders');

    const parentUrl = () => {
        if (params.parent) {
            const parts = params.parent.split('/');
            const path = '/' + parts.slice(0, -1).join('/');
            return useUrl(searchParams, `/folders/${root()}${path}`);
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
        <main
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabindex="0"
            onKeyDown={handleKeyDown}
            ref={mainRef}
            classList={{ FoldersScreen: true }}
        >
            <Spinner size="l" when={!ready()} />
            <Show when={ready()}>
                <FoldersNavigationProvider {...navigationContext}>
                    <GallerySelectionProvider {...selectionContext}>
                        <FoldersQueryProvider {...foldersQueryContext}>
                            <Spinner when={loadingFolders()} size="l" />
                            <Show when={!loadingFolders()}>
                                <FoldersHomePage folders={subFolders} />
                            </Show>
                        </FoldersQueryProvider>
                    </GallerySelectionProvider>
                </FoldersNavigationProvider>
            </Show>
        </main>
    );
};

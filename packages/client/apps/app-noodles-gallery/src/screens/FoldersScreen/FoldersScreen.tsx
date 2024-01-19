/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { inject } from '@noodlestan/ui-services';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect, on } from 'solid-js';

import { FoldersHomePage } from './pages/FoldersHomePage';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { useUrl } from '@/navigation/useUrl';
import {
    FoldersNavigationProvider,
    createFoldersNavigationContext,
} from '@/providers/FoldersNavigation';
import { FoldersQueryProvider } from '@/providers/FoldersQuery';
import { AppService } from '@/services/App';
import { FoldersService } from '@/services/Folders';
import { FoldersQueryService } from '@/services/FoldersQuery';

import './FoldersScreen.css';

export const FoldersScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { ready } = inject(AppService);
    const { searchFolders } = inject(FoldersService);

    const params = useParams();
    const [searchParams] = useSearchParams();
    const { createQueryContext } = inject(FoldersQueryService);
    const queryContext = createQueryContext(params.parent, searchParams.search);

    const subFolders = () => searchFolders(params.parent || '', searchParams.search);
    const navigationContext = createFoldersNavigationContext(subFolders);
    const { bus } = navigationContext;

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
                    <FoldersQueryProvider context={queryContext}>
                        <FoldersHomePage items={subFolders} />
                    </FoldersQueryProvider>
                </FoldersNavigationProvider>
            </Show>
        </main>
    );
};

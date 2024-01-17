import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import { Component, Show, createEffect, on } from 'solid-js';

import { FoldersBar } from '@/molecules/FoldersBar/FoldersBar';
import { FoldersBreadcrumbs } from '@/molecules/FoldersBreadcrumbs/FoldersBreadcrumbs';
import { FoldersScroll } from '@/molecules/FoldersScroll/FoldersScroll';
import { useUrl } from '@/navigation/useUrl';
import { FolderDetails } from '@/organisms/FolderDetails/FolderDetails';
import { FolderItems } from '@/organisms/FolderItems/FolderItems';
import { Folders } from '@/organisms/Folders/Folders';
import {
    FoldersNavigationProvider,
    createFoldersNavigationContext,
} from '@/providers/FoldersNavigation';
import { FoldersQueryProvider } from '@/providers/FoldersQuery';
import { createPhotosResource } from '@/resources/Photo/createPhotosResource';
import { FoldersService } from '@/services/Folders';
import { FoldersQueryService } from '@/services/FoldersQuery';

import './FoldersScreen.css';

export const FoldersScreen: Component = () => {
    let mainRef: HTMLDivElement | undefined;

    const { searchFolders, loading } = inject(FoldersService);

    const params = useParams();
    const [searchParams] = useSearchParams();
    const { createQueryContext } = inject(FoldersQueryService);
    const queryContext = createQueryContext(params.parent, searchParams.search);

    const subFolders = () => searchFolders(params.parent || '', searchParams.search);
    const navigationContext = createFoldersNavigationContext(subFolders);
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

    const query = () => ({ filterBy: { folder: params.parent } });
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
            classList={{ FoldersScreen: true }}
        >
            <FoldersNavigationProvider {...navigationContext}>
                <FoldersQueryProvider context={queryContext}>
                    <Surface variant="stage">
                        <FoldersBar />
                        <FoldersScroll>
                            <Show when={loading()}>Loading</Show>
                            <Show when={!loading()}>
                                <FoldersBreadcrumbs />
                                <Show when={params.parent}>
                                    <FolderDetails folder={params.parent} items={resource} />
                                    <FolderItems
                                        folder={params.parent}
                                        items={resource}
                                        toggleVisibility={subFolders().length > 0}
                                        showAllItems={showAllItems()}
                                    />
                                </Show>
                                <Show when={!showAllItems()}>
                                    <Folders items={subFolders} />
                                </Show>
                            </Show>
                        </FoldersScroll>
                    </Surface>
                </FoldersQueryProvider>
            </FoldersNavigationProvider>
        </main>
    );
};

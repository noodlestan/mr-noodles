import type { IGroup, ISort } from '@noodlestan/shared-types';
import { Component, Show } from 'solid-js';

import { appStore } from './private/store';

import { PhotosService } from '@/services/Photos';
import { inject } from '@/services/inject';
import { QueryBar } from '@/ui/molecules/QueryBar/QueryBar';
import { Gallery } from '@/ui/organisms/Gallery/Gallery';

import './App.css';

const groupByToSortBy = (group: IGroup[]): ISort[] => {
    return group.map(({ field, dir }) => {
        return { field, dir };
    });
};

export const App: Component = () => {
    const { loading, photos, query, setQuery } = inject(PhotosService);
    const { groupBy, setGroupBy, sortBy } = appStore;

    setGroupBy([
        { field: 'album', dir: 'asc' },
        { field: 'date', group: 'day', dir: 'desc' },
    ]);

    const sort = () => groupByToSortBy(groupBy());
    setQuery({
        sortBy: [...sort(), ...sortBy()],
    });

    return (
        <main>
            <Show when={loading()}>Loading</Show>
            <Show when={!loading()}>
                <QueryBar query={query} />
            </Show>
            <Show when={!loading()}>
                <Gallery items={photos} groupBy={groupBy} query={query} />
            </Show>
        </main>
    );
};

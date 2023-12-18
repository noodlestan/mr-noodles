import type { IGroup, ISort } from '@noodlestan/shared-types';
import { Accessor, createSignal } from 'solid-js';

const [groupBy, setGroupBy] = createSignal<IGroup[]>([]);
const [sortBy, setSortBy] = createSignal<IGroup[]>([]);

type appStore = {
    groupBy: Accessor<IGroup[]>;
    setGroupBy: (loading: IGroup[]) => void;
    sortBy: Accessor<ISort[]>;
    setSortBy: (loading: ISort[]) => void;
};

export const appStore = {
    groupBy,
    setGroupBy,
    sortBy,
    setSortBy,
};

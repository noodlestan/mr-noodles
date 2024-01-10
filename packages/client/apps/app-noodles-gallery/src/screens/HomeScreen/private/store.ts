import type { IGroup, ISort } from '@noodlestan/shared-types';
import { Accessor, createSignal } from 'solid-js';

const [groupBy, setGroupBy] = createSignal<IGroup[]>([]);
const [sortBy, setSortBy] = createSignal<IGroup[]>([]);

type GalleryStore = {
    groupBy: Accessor<IGroup[]>;
    setGroupBy: (loading: IGroup[]) => void;
    sortBy: Accessor<ISort[]>;
    setSortBy: (loading: ISort[]) => void;
};

export const galleryStore: GalleryStore = {
    groupBy,
    setGroupBy,
    sortBy,
    setSortBy,
};

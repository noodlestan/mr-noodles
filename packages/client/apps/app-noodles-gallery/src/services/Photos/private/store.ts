import type { APIResponseMeta, PhotoData, PhotoQuery } from '@noodlestan/shared-types';
import { Accessor, createSignal } from 'solid-js';

const [loading, setLoading] = createSignal<boolean>(false);
const [query, setQuery] = createSignal<PhotoQuery>({});
const [photos, setPhotos] = createSignal<PhotoData[]>([]);
const [meta, setMeta] = createSignal<APIResponseMeta>({});

type PhotosStore = {
    loading: Accessor<boolean>;
    setLoading: (loading: boolean) => void;
    query: Accessor<PhotoQuery>;
    setQuery: (query: PhotoQuery) => void;
    photos: Accessor<PhotoData[]>;
    setPhotos: (photos: PhotoData[]) => void;
    meta: Accessor<APIResponseMeta>;
    setMeta: (meta: APIResponseMeta) => void;
};

export const photosStore: PhotosStore = {
    loading,
    setLoading,
    query,
    setQuery,
    photos,
    setPhotos,
    meta,
    setMeta,
};

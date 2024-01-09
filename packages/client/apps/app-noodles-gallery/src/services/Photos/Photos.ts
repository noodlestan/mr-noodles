import type { PhotoData, PhotoQuery } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { photosStore } from './private/store';

import { fetchPhotos } from '@/resources/Photo/fetchPhotos';

type PhotosService = {
    loading: Accessor<boolean>;
    query: Accessor<PhotoQuery>;
    setQuery: (filter: PhotoQuery) => void;
    photos: Accessor<PhotoData[]>;
};

export const createPhotosService = (): PhotosService => {
    const { loading, setLoading, query, setQuery, photos, setPhotos, setMeta } = photosStore;

    const queryNow = async (query: PhotoQuery) => {
        setQuery(query);
        setLoading(true);
        const { data, meta } = await fetchPhotos(query);
        setPhotos(data);
        setMeta(meta);
        setLoading(false);
    };

    return {
        loading,
        query,
        setQuery: queryNow,
        photos,
    };
};

import type { APIResponse, PhotoData, PhotoQuery, QueryParams } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';
import { Accessor } from 'solid-js';

import { photosStore } from './private/store';

import { API_BASE_URL } from '@/env';

type PhotosService = {
    loading: Accessor<boolean>;
    query: Accessor<PhotoQuery>;
    setQuery: (filter: PhotoQuery) => void;
    photos: Accessor<PhotoData[]>;
};

const fetchPhotos = async (query: PhotoQuery): Promise<APIResponse<PhotoData[]>> => {
    const { sortBy, filterBy } = query;
    const params: QueryParams = {
        pageSize: 200,
        sortBy: sortBy && JSON.stringify(sortBy),
        filterBy: filterBy && JSON.stringify(filterBy),
    };
    const { data, meta } = await apiGet<PhotoData[]>(API_BASE_URL, `photos`, params);
    return { data, meta };
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

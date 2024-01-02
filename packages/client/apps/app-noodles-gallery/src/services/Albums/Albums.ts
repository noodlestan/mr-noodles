import type { APIResponse, AlbumData } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';
import { Accessor, createResource } from 'solid-js';

import { API_BASE_URL } from '@/env';

type AlbumsService = {
    loading: Accessor<boolean>;
    albums: Accessor<AlbumData[]>;
    refetch: () => void;
    getAlbumBySlug: (slug: string) => AlbumData | undefined;
};

const fetchAlbums = async (): Promise<APIResponse<AlbumData[]>> => {
    const { data, meta } = await apiGet<AlbumData[]>(API_BASE_URL, `albums`);
    return { data, meta };
};

export const createAlbumsService = (): AlbumsService => {
    const [resource, { refetch }] = createResource(fetchAlbums);

    const loading = () => resource.loading;
    const albums = () => resource()?.data || [];

    const getAlbumBySlug = (slug: string) => {
        return albums().find(album => album.slug === slug);
    };

    return {
        loading,
        albums,
        refetch,
        getAlbumBySlug,
    };
};

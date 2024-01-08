import type { APIResponse, AlbumData } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';
import { Accessor, createResource } from 'solid-js';

import { createAlbumFromChild, searchByParent, searchItems } from './private/utils';

import { API_BASE_URL } from '@/env';

type AlbumsService = {
    loading: Accessor<boolean>;
    albums: () => AlbumData[];
    searchAlbums: (parent?: string, search?: string) => AlbumData[];
    refetch: () => void;
    getAlbumBySlug: (slug: string) => AlbumData | undefined;
};

const fetchAlbums = async (): Promise<APIResponse<AlbumData[]>> => {
    const params = {
        pageSize: 5000,
    };
    const { data, meta } = await apiGet<AlbumData[]>(API_BASE_URL, `albums`, params);
    return { data, meta };
};

export const createAlbumsService = (): AlbumsService => {
    const [resource, { refetch }] = createResource(fetchAlbums);

    const loading = () => resource.loading;
    const albums = () => resource()?.data || [];

    const getAlbumBySlug = (slug: string) => {
        const match = albums().find(album => album.slug === slug);
        if (match) {
            return match;
        }
        const child = albums().find(album => album.slug.startsWith(slug));
        if (child && child.title) {
            const length = slug.split('/').length;
            const parent = createAlbumFromChild(slug, child.title, length);
            return parent;
        }
    };

    const searchAlbums = (parent?: string, search?: string) => {
        const albums_ = albums();
        const albums__ = parent !== undefined ? searchByParent(albums_, parent) : albums_;
        const filtered = search ? searchItems(albums__, search) : albums__;
        return filtered;
    };

    return {
        loading,
        albums,
        searchAlbums,
        refetch,
        getAlbumBySlug,
    };
};

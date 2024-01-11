import type { APIResponse, AlbumData } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';

import { API_BASE_URL } from '@/env';

const mapItem = (item: AlbumData): AlbumData => {
    const { dateCreated, dateUpdated } = item;

    return {
        ...item,
        dateCreated: dateCreated && new Date(dateCreated),
        dateUpdated: dateUpdated && new Date(dateUpdated),
    };
};

export const fetchAlbums = async (): Promise<APIResponse<AlbumData[]>> => {
    const params = {
        pageSize: 5000,
    };
    const { data, meta } = await apiGet<AlbumData[]>(API_BASE_URL, `albums`, params);

    return { data: data.map(mapItem), meta };
};

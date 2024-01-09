import type { APIResponse, PhotoData, PhotoQuery, QueryParams } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';

import { API_BASE_URL } from '@/env';

export const fetchPhotos = async (query: PhotoQuery): Promise<APIResponse<PhotoData[]>> => {
    const { sortBy, filterBy } = query;
    const params: QueryParams = {
        pageSize: 200,
        sortBy: sortBy && JSON.stringify(sortBy),
        filterBy: filterBy && JSON.stringify(filterBy),
    };
    const { data, meta } = await apiGet<PhotoData[]>(API_BASE_URL, `photos`, params);
    return { data, meta };
};

import type { APIResponse, PhotoData, PhotoQuery, QueryParams } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';

import { API_BASE_URL } from '@/env';

const mapItem = (item: PhotoData): PhotoData => {
    const { date, dateCreated, dateUpdated } = item;

    return {
        ...item,
        date: date && new Date(date),
        dateCreated: dateCreated && new Date(dateCreated),
        dateUpdated: dateUpdated && new Date(dateUpdated),
    };
};

export const fetchPhotos = async (query: PhotoQuery): Promise<APIResponse<PhotoData[]>> => {
    const { sortBy, filterBy } = query;
    const params: QueryParams = {
        pageSize: 200,
        sortBy: sortBy && JSON.stringify(sortBy),
        filterBy: filterBy && JSON.stringify(filterBy),
    };
    const { data, meta } = await apiGet<PhotoData[]>(API_BASE_URL, `photos`, params);

    return { data: data.map(mapItem), meta };
};

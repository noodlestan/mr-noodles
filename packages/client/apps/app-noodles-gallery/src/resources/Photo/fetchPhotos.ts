import type {
    APIResponse,
    PhotoData,
    PhotoModel,
    PhotoQuery,
    QueryParams,
} from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';

import { API_BASE_URL } from '@/env';

const mapItem = (item: PhotoData): PhotoModel => {
    const { dateCreated, dateUpdated, dateTaken } = item;

    return {
        ...item,
        dateCreated: new Date(dateCreated),
        dateUpdated: dateUpdated ? new Date(dateUpdated) : undefined,
        dateTaken: dateTaken ? new Date(dateTaken) : undefined,
    };
};

export const fetchPhotos = async (query: PhotoQuery): Promise<APIResponse<PhotoModel[]>> => {
    const { sortBy, filterBy } = query;
    const params: QueryParams = {
        pageSize: 200,
        sortBy: sortBy && JSON.stringify(sortBy),
        filterBy: filterBy && JSON.stringify(filterBy),
    };
    const { data, meta } = await apiGet<PhotoData[]>(API_BASE_URL, `photos`, params);

    return { data: data.map(mapItem), meta };
};

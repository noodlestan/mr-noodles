import type { APIResponse, FolderData, FolderModel } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';

import { API_BASE_URL } from '@/env';

const mapItem = (item: FolderData): FolderModel => {
    const { dateCreated, dateUpdated, dateFrom, dateUntil } = item;

    return {
        ...item,
        dateCreated: new Date(dateCreated),
        dateUpdated: dateUpdated ? new Date(dateUpdated) : undefined,
        dateFrom: dateFrom ? new Date(dateFrom) : undefined,
        dateUntil: dateUntil ? new Date(dateUntil) : undefined,
    };
};

export const fetchFolders = async (): Promise<APIResponse<FolderModel[]>> => {
    const params = {
        pageSize: 5000,
    };
    const { data, meta } = await apiGet<FolderData[]>(API_BASE_URL, `folders`, params);

    return { data: data.map(mapItem), meta };
};

import type { APIResponse, UserData, UserModel } from '@noodlestan/shared-types';
import { apiGet } from '@noodlestan/shared-types/src/api';

import { API_BASE_URL } from '@/env';

const mapItem = (item: UserData): UserModel => {
    const { dateCreated, dateUpdated, dateCitizen } = item;

    return {
        ...item,
        dateCreated: new Date(dateCreated),
        dateUpdated: dateUpdated ? new Date(dateUpdated) : undefined,
        dateCitizen: dateCitizen ? new Date(dateCitizen) : undefined,
    };
};

export const fetchUsers = async (): Promise<APIResponse<UserModel[]>> => {
    const params = {};
    const { data, meta } = await apiGet<UserData[]>(API_BASE_URL, `users`, params);

    return { data: data.map(mapItem), meta };
};

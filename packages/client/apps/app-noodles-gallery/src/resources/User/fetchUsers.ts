import type { APIResponse, UserNoodle } from '@noodlestan/shared-types';
import { importUser } from '@noodlestan/shared-types';

import { apiGet } from '../../api/apiGet';
import { API_ENDPOINTS } from '../endpoints';

export const fetchUsers = async (): Promise<APIResponse<UserNoodle[]>> => {
    const params = {};
    const { data, meta } = await apiGet<{ results: UserNoodle[] }>(API_ENDPOINTS.users(), params);

    return { data: data.results.map(importUser), meta };
};

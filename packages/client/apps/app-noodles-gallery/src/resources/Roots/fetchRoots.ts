import type { APIResponse, Root } from '@noodlestan/shared-types';
import { importRoot } from '@noodlestan/shared-types';

import { apiGet } from '../../api/apiGet';
import { API_ENDPOINTS } from '../endpoints';

export const fetchRoots = async (): Promise<APIResponse<Root[]>> => {
    const { data, meta } = await apiGet<{ results: Root[] }>(API_ENDPOINTS.roots());

    return { data: data.results.map(importRoot), meta };
};

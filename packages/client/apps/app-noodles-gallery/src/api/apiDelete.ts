import type { APIResponse, QueryParams } from '@noodlestan/shared-types';

import { apiRequestURL } from './functions/apiRequestURL';

export async function apiDelete<T>(
    endpoint: string,
    params?: QueryParams,
): Promise<APIResponse<T>> {
    const url = apiRequestURL(endpoint, params);

    const response = await fetch(url, { method: 'DELETE' });
    const data = (await response.json()) as T;
    if (response.status !== 200) {
        throw new Error();
    }

    const meta = {};
    return { data, meta };
}

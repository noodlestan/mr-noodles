import type { APIResponse, QueryParams } from '@noodlestan/shared-types';

import { apiRequestURL } from './functions/apiRequestURL';

export async function apiPut<T>(
    endpoint: string,
    params?: QueryParams,
    payload?: unknown,
): Promise<APIResponse<T>> {
    const url = apiRequestURL(endpoint, params);
    const options = {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json',
        },
    };
    const response = await fetch(url, options);
    const data = (await response.json()) as T;
    if (response.status !== 200) {
        throw new Error();
    }
    const meta = {};
    return { data, meta };
}

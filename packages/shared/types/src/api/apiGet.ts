import type { APIResponse } from '../api';
import type { QueryParams } from '../query';

import { apiResourceURL } from './apiResourceURL';

export async function apiGet<T>(
    baseUrl: string,
    resource: string,
    params?: QueryParams,
): Promise<APIResponse<T>> {
    const url = apiResourceURL(baseUrl, resource, params);
    const response = await fetch(url, {});
    const data = (await response.json()) as T;
    const meta = {};
    return { data, meta };
}

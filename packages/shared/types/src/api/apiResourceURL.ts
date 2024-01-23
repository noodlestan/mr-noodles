import type { QueryParams } from '../query/index.js';

import { paramsToQuery } from './paramsToQuery';

export const apiResourceURL = (base: string, resource: string, params?: QueryParams): string => {
    const query = params ? '?' + paramsToQuery(params) : '';
    return `${base}/${resource}${query}`;
};

import type { QueryParams } from '@noodlestan/shared-types';

import { paramsToQuery } from './paramsToQuery';

export const apiRequestURL = (endpoint: string, params?: QueryParams): string => {
    const query = params ? '?' + paramsToQuery(params) : '';
    return `${endpoint}${query}`;
};

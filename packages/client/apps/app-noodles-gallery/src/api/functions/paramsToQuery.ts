import type { QueryParams } from '@noodlestan/shared-types';

import { encodeURIValue } from './encodeURIValue';

export const paramsToQuery = (params: QueryParams): string => {
    const query = new URLSearchParams();
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach(item => item && query.append(key, item as string));
        }
        if (typeof value === 'object') {
            Object.entries(value).forEach(([k, item]) => {
                query.append(`${key}<${k}>`, encodeURIValue(item as string));
            });
        } else if (typeof value !== 'undefined') {
            query.append(key, encodeURIComponent(value));
        }
    });
    return query.toString();
};

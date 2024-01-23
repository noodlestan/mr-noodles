import { QueryParams } from '../query/index.js';

export const queryToParams = (query?: QueryParams): QueryParams | undefined => {
    const params: QueryParams = {};

    const entries = query && Object.entries(params);

    entries?.forEach(([key, value]) => {
        params[key] = value;
    });

    return entries?.length ? params : undefined;
};

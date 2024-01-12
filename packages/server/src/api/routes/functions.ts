import { IPagination, ISort } from '@noodlestan/shared-types';
import { Request } from 'express';

export const paginationFromQuery = (
    query: Request['query'],
    defaultSize?: number,
    maxSize?: number,
): IPagination | undefined => {
    const { pageNo, pageSize } = query;

    delete query.pageNo;
    delete query.pageSize;

    const tempSize = Number(pageSize) || defaultSize;
    const size = tempSize && tempSize > (maxSize as number) ? maxSize : tempSize;
    const no = size && (pageNo ? Number(pageNo) : 1);

    const page = no && size ? { page: no, size } : undefined;

    return page;
};

export const sortFromQuery = (
    query: Request['query'],
    defaultSortBy?: string,
    defaultSortDir?: ISort['dir'],
): ISort[] | undefined => {
    const { sortBy } = query;
    delete query.sortBy;

    const def = defaultSortBy
        ? [{ field: defaultSortBy, dir: defaultSortDir || 'desc' }]
        : undefined;
    try {
        const sort = JSON.parse(decodeURIComponent(String(sortBy)));
        if (!Array.isArray(sort) || !sort.length) {
            return def;
        }
        return sort;
    } catch (error) {
        return def;
    }
};

export const filterByFromQuery = (query: Request['query']): Record<string, unknown> => {
    const { filterBy } = query;

    try {
        const input = decodeURIComponent(filterBy as string);
        return JSON.parse(input);
    } catch (error) {
        return {};
    }
};

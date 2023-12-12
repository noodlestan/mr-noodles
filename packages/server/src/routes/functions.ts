import { Request } from 'express';

import { IPagination, ISort } from '../models/types';

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
): ISort | undefined => {
    const { sortBy, sortDir } = query;
    delete query.sortBy;
    delete query.sortDir;

    const field = String(sortBy || defaultSortBy);
    const dir = String(sortDir || defaultSortDir || 'desc') as ISort['dir'];

    const sort = field ? { field, dir } : undefined;

    return sort;
};

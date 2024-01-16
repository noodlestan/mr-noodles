import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { NextFunction, Request, Response } from 'express';

import { findUsers } from '../../../controllers/users/findUsers';
import { userToData } from '../../../models/user';
import { PHOTOS_PAGE_MAX, PHOTOS_PAGE_SIZE_DEFAULT } from '../constants';
import { filterByFromQuery, paginationFromQuery, sortFromQuery } from '../functions';

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { ...query } = req.query;

        const page = paginationFromQuery(query, PHOTOS_PAGE_SIZE_DEFAULT, PHOTOS_PAGE_MAX);
        res.setHeader('x-meta-page-no', `${page?.page}`);
        res.setHeader('x-meta-page-size', `${page?.size}`);

        const sort = sortFromQuery(query, 'date', 'desc');
        res.setHeader(
            'x-meta-sort-by',
            `${sort ? sort.map(({ field, dir }) => `${field}=${dir}`).join('&') : ''}`,
        );
        res.setHeader('x-meta-filter', `${querystring.encode(query as ParsedUrlQueryInput)}`);

        const filterBy = filterByFromQuery(query);
        const users = findUsers(filterBy, sort, page);

        const data = users.map(userToData);

        res.json(data);
    } catch (error) {
        next(error);
    }
};

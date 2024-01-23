import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import type { ImageNoodle } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { findFiles } from '../../../controllers/files/findFiles';
import { exportNoodle } from '../../../noodles';
import { FILES_PAGE_MAX, FILES_PAGE_SIZE_DEFAULT } from '../constants';
import { filterByFromQuery, paginationFromQuery, sortFromQuery } from '../functions';

export const getFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { ...query } = req.query;

        console.log(req.query);

        const page = paginationFromQuery(query, FILES_PAGE_SIZE_DEFAULT, FILES_PAGE_MAX);
        res.setHeader('x-meta-page-no', `${page?.page}`);
        res.setHeader('x-meta-page-size', `${page?.size}`);

        const sort = sortFromQuery(query, 'date', 'desc');
        res.setHeader(
            'x-meta-sort-by',
            `${sort ? sort.map(({ field, dir }) => `${field}=${dir}`).join('&') : ''}`,
        );
        res.setHeader('x-meta-filter', `${querystring.encode(query as ParsedUrlQueryInput)}`);

        const filterBy = filterByFromQuery(query);
        const photos = findFiles<ImageNoodle>(filterBy, sort, page);
        const data = photos.map(exportNoodle);

        res.json({ results: data });
    } catch (error) {
        next(error);
    }
};

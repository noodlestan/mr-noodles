import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { NextFunction, Request, Response } from 'express';

import { getPhotos } from '../../controllers/photos/getPhotos';
import { PHOTOS_PAGE_MAX, PHOTOS_PAGE_SIZE_DEFAULT } from '../constants';
import { paginationFromQuery, sortFromQuery } from '../functions';

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { ...filter } = req.query;

        const page = paginationFromQuery(filter, PHOTOS_PAGE_SIZE_DEFAULT, PHOTOS_PAGE_MAX);
        res.setHeader('x-meta-page-no', `${page?.page}`);
        res.setHeader('x-meta-page-size', `${page?.size}`);

        const sort = sortFromQuery(filter, 'date', 'desc');
        res.setHeader('x-meta-sort-by', `${sort?.field}`);
        res.setHeader('x-meta-sort-dir', `${sort?.dir}`);

        res.setHeader('x-meta-filter', `${querystring.encode(filter as ParsedUrlQueryInput)}`);

        const photos = await getPhotos(filter, page, sort);
        const data = photos.map(photo => photo.toDataPublic());

        res.json(data);
    } catch (error) {
        next(error);
    }
};

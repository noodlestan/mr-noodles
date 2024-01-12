import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { NextFunction, Request, Response } from 'express';

import { findAlbums } from '../../../controllers/albums/findAlbums';
import { ALBUMS_PAGE_MAX, ALBUMS_PAGE_SIZE_DEFAULT } from '../constants';
import { paginationFromQuery, sortFromQuery } from '../functions';

export const getAlbums = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { ...filter } = req.query;

        const page = paginationFromQuery(filter, ALBUMS_PAGE_SIZE_DEFAULT, ALBUMS_PAGE_MAX);
        res.setHeader('x-meta-page-no', `${page?.page}`);
        res.setHeader('x-meta-page-size', `${page?.size}`);

        const sort = sortFromQuery(filter, 'title', 'desc');
        res.setHeader('x-meta-sort-by', `${sort}`);

        res.setHeader('x-meta-filter', `${querystring.encode(filter as ParsedUrlQueryInput)}`);

        const albums = await findAlbums(filter, page, sort);
        const data = albums.map(album => album.toDataPublic());

        res.json(data);
    } catch (error) {
        next(error);
    }
};

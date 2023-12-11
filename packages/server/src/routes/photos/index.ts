import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { Request, Response, Router } from 'express';

import { getPhotos } from '../../controllers/photos/getPhotos';
import { PHOTOS_PAGE_MAX, PHOTOS_PAGE_SIZE_DEFAULT } from '../constants';
import { paginationFromQuery, sortFromQuery } from '../functions';

export const get = async (req: Request, res: Response): Promise<void> => {
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
};

export const recent = async (req: Request, res: Response): Promise<void> => {
    const { ...filter } = req.query;
    req.query = { ...filter, sortBy: 'dateCreated', sortDir: 'desc' };
    return get(req, res);
};

const router = Router();
router.get('/', get);
router.get('/recent', recent);

export { router as photosRouter };

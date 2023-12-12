import { readFile } from 'node:fs/promises';
import path from 'node:path';
import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { Request, Response, Router } from 'express';

import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { getPhotos } from '../../controllers/photos/getPhotos';
import { PUBLIC_ASSETS_DIR } from '../../env';
import { makeThumb } from '../../services/thumbs/makeThumb';
import { PHOTOS_PAGE_MAX, PHOTOS_PAGE_SIZE_DEFAULT } from '../constants';
import { paginationFromQuery, sortFromQuery } from '../functions';

const getAll = async (req: Request, res: Response): Promise<void> => {
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

const getRecent = async (req: Request, res: Response): Promise<void> => {
    const { ...filter } = req.query;
    req.query = { ...filter, sortBy: 'dateCreated', sortDir: 'desc' };
    return getAll(req, res);
};

const getPhoto = async (req: Request, res: Response): Promise<void> => {
    const photo = await getPhotoById(req.params.id);

    if (!photo) {
        res.status(404).json();
    } else {
        res.json(photo.toDataPublic());
    }
};

const getPhotoThumb = async (req: Request, res: Response): Promise<void> => {
    const photo = await getPhotoById(req.params.id);

    if (!photo) {
        res.status(404).json();
    } else {
        const thumb = await makeThumb(photo.filename, photo.id);

        const filename = path.join(PUBLIC_ASSETS_DIR, thumb);
        const contents = (await readFile(filename)).toString();

        res.send(contents);
    }
};

const router = Router();
router.get('/', getAll);
router.get('/recent', getRecent);

router.get('/:id', getPhoto);
router.get('/:id/thumb', getPhotoThumb);

export { router as photosRouter };

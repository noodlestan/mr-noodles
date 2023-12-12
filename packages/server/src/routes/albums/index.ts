import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { Request, Response, Router } from 'express';

import { getAlbumById } from '../../controllers/albums/getAlbumById';
import { getAlbums } from '../../controllers/albums/getAlbums';
import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Album } from '../../models/album';
import { makeThumb } from '../../services/thumbs/makeThumb';
import { readThumb } from '../../services/thumbs/readThumb';
import { thumbExists } from '../../services/thumbs/thumbExists';
import { ALBUMS_PAGE_MAX, ALBUMS_PAGE_SIZE_DEFAULT } from '../constants';
import { paginationFromQuery, sortFromQuery } from '../functions';

const getAll = async (req: Request, res: Response): Promise<void> => {
    const { ...filter } = req.query;

    const page = paginationFromQuery(filter, ALBUMS_PAGE_SIZE_DEFAULT, ALBUMS_PAGE_MAX);
    res.setHeader('x-meta-page-no', `${page?.page}`);
    res.setHeader('x-meta-page-size', `${page?.size}`);

    const sort = sortFromQuery(filter, 'title', 'desc');
    res.setHeader('x-meta-sort-by', `${sort?.field}`);
    res.setHeader('x-meta-sort-dir', `${sort?.dir}`);

    res.setHeader('x-meta-filter', `${querystring.encode(filter as ParsedUrlQueryInput)}`);

    const albums = await getAlbums(filter, page, sort);
    const data = albums.map(album => album.toDataPublic());

    res.json(data);
};

export const getAlbum = async (req: Request, res: Response): Promise<void> => {
    const album = await getAlbumById(req.params.id);

    if (!album) {
        res.status(404).json();
    } else {
        res.json(album.toDataPublic());
    }
};

export const getAlbumThumb = async (req: Request, res: Response): Promise<void> => {
    const album = await getAlbumById(req.params.id);
    if (!album) {
        res.status(404).json();
        return;
    }

    const exists = album.thumb && (await thumbExists(album.thumb));

    if (album.thumb && exists) {
        const image = await readThumb(album.thumb);
        res.setHeader('content-type', 'image/jpg');
        res.send(image);
        return;
    }

    if (!album.photos.length) {
        res.status(404).json();
        return;
    }

    const photo = await getPhotoById(album.photos[0]);
    if (!photo) {
        res.status(404).json();
        return;
    }

    const thumb = await makeThumb(photo.filename, photo.id);
    await Album.addThumbToAlbum(album.id, thumb);
    const image = await readThumb(thumb);
    res.setHeader('content-type', 'image/jpg');
    res.send(image);
};

const router = Router();
router.get('/', getAll);

router.get('/:id', getAlbum);
router.get('/:id/thumb', getAlbumThumb);

export { router as albumsRouter };

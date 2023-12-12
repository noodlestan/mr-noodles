import { NextFunction, Request, Response } from 'express';

import { getAlbumById } from '../../controllers/albums/getAlbumById';
import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Album } from '../../models/album';
import { makeThumb } from '../../services/thumbs/makeThumb';
import { readThumb } from '../../services/thumbs/readThumb';
import { thumbExists } from '../../services/thumbs/thumbExists';
import { notFoundHandler } from '../responses';

export const getAlbumThumb = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const album = await getAlbumById(req.params.id);
        if (!album) {
            notFoundHandler(req, res, next);
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
            notFoundHandler(req, res, next);
            return;
        }

        const photo = await getPhotoById(album.photos[0]);
        if (!photo) {
            notFoundHandler(req, res, next);
            return;
        }

        const thumb = await makeThumb(photo.filename, photo.id);
        await Album.addThumbToAlbum(album.id, thumb);

        const image = await readThumb(thumb);
        res.setHeader('content-type', 'image/jpg');
        res.send(image);
    } catch (error) {
        next(error);
    }
};

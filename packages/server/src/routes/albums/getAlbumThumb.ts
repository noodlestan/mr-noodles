import { selectThumbByHeight } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { getAlbumById } from '../../controllers/albums/getAlbumById';
import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Album } from '../../models/album';
import { THUMB_HEIGHT_BIG, THUMB_HEIGHT_SMALL } from '../../services/thumbs/constants';
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

        const height = Number(req.query.h);
        const thumb = selectThumbByHeight(album.thumbs, height);
        const exists = thumb && (await thumbExists(thumb.f));

        if (album.thumbs && exists) {
            const image = await readThumb(thumb.f);
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

        const thumbBig = await makeThumb(photo.filename, photo.id, THUMB_HEIGHT_BIG);
        const thumbSmall = await makeThumb(photo.filename, photo.id, THUMB_HEIGHT_SMALL);
        const thumbs = [
            { h: THUMB_HEIGHT_SMALL, f: thumbSmall.f },
            { h: THUMB_HEIGHT_BIG, f: thumbBig.f },
        ];
        await Album.addThumbsToAlbum(photo.id, thumbs);

        const matchingThumb = selectThumbByHeight(thumbs, height);
        const image = matchingThumb && (await readThumb(matchingThumb.f));
        res.setHeader('content-type', 'image/jpg');
        res.send(image);
    } catch (error) {
        next(error);
    }
};

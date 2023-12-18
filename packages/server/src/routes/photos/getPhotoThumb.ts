import { NextFunction, Request, Response } from 'express';

import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Photo } from '../../models/photo';
import { THUMB_HEIGHT_BIG, THUMB_HEIGHT_SMALL } from '../../services/thumbs/constants';
import { makeThumb } from '../../services/thumbs/makeThumb';
import { readThumb } from '../../services/thumbs/readThumb';
import { selectThumbByHeight } from '../../services/thumbs/selectThumbByHeight';
import { thumbExists } from '../../services/thumbs/thumbExists';
import { notFoundHandler } from '../responses';

export const getPhotoThumb = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const photo = await getPhotoById(req.params.id);

        if (!photo) {
            notFoundHandler(req, res, next);
            return;
        }
        const height = Number(req.query.h);
        const thumb = selectThumbByHeight(photo.thumbs, height);
        const exists = thumb && (await thumbExists(thumb.f));

        if (photo.thumbs && exists) {
            const image = await readThumb(thumb.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        const thumbBig = await makeThumb(photo.filename, photo.id, THUMB_HEIGHT_BIG);
        const thumbSmall = await makeThumb(photo.filename, photo.id, THUMB_HEIGHT_SMALL);
        const thumbs = [
            { h: THUMB_HEIGHT_SMALL, f: thumbSmall.f },
            { h: THUMB_HEIGHT_BIG, f: thumbBig.f },
        ];
        await Photo.addThumbsToPhoto(photo.id, thumbs);

        const matchingThumb = selectThumbByHeight(thumbs, height);
        const image = matchingThumb && (await readThumb(matchingThumb.f));
        res.setHeader('content-type', 'image/jpg');
        res.send(image);
    } catch (error) {
        next(error);
    }
};

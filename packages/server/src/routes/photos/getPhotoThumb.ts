import { NextFunction, Request, Response } from 'express';

import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Photo } from '../../models/photo';
import { makeThumb } from '../../services/thumbs/makeThumb';
import { readThumb } from '../../services/thumbs/readThumb';
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

        const thumb = await makeThumb(photo.filename, photo.id);
        await Photo.addThumbToPhoto(photo.id, thumb);

        const image = await readThumb(thumb);
        res.setHeader('content-type', 'image/jpg');
        res.send(image);
    } catch (error) {
        next(error);
    }
};

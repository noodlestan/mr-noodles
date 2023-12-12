import { NextFunction, Request, Response } from 'express';

import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { notFoundHandler } from '../responses';

export const getPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const photo = await getPhotoById(req.params.id);

        if (!photo) {
            notFoundHandler(req, res, next);
            return;
        }
        res.json(photo.toDataPublic());
    } catch (error) {
        next(error);
    }
};

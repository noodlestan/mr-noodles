import { NextFunction, Request, Response } from 'express';

import { getAlbumById } from '../../../controllers/albums/getAlbumById';
import { notFoundHandler } from '../responses';

export const getAlbum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const album = await getAlbumById(req.params.id);

        if (!album) {
            notFoundHandler(req, res, next);
            return;
        }

        res.json(album.toDataPublic());
    } catch (error) {
        next(error);
    }
};

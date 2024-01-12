import { NextFunction, Request, Response } from 'express';

import { findAlbumById } from '../../../controllers/albums/findAlbumById';
import { notFoundHandler } from '../responses';

export const getAlbum = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const album = await findAlbumById(req.params.id);

        if (!album) {
            notFoundHandler(req, res, next);
            return;
        }

        res.json(album.toDataPublic());
    } catch (error) {
        next(error);
    }
};

import { PhotoModel } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { getNoodleById, noodleExists } from '../../../noodles';
import { photoToData } from '../../../models/photo';
import { notFoundHandler } from '../responses';

export const getPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const photo = getNoodleById<PhotoModel>(req.params.id);
        res.json(photoToData(photo));
    } catch (error) {
        next(error);
    }
};

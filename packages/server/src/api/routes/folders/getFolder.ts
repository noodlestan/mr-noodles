import { FolderModel } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { getNoodleById, noodleExists } from '../../../db';
import { folderToData } from '../../../models/folder';
import { notFoundHandler } from '../responses';

export const getFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const folder = await getNoodleById<FolderModel>(req.params.id);

        res.json(folderToData(folder));
    } catch (error) {
        next(error);
    }
};

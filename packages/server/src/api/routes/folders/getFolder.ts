import type { FolderNoodle } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { exportNoodle, getNoodleById, noodleExists } from '../../../noodles';
import { notFoundHandler } from '../responses';

export const getFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const folder = await getNoodleById<FolderNoodle>(req.params.id);

        res.json(exportNoodle(folder));
    } catch (error) {
        next(error);
    }
};

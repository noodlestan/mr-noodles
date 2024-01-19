import type { FileNoodle } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { exportNoodle, getNoodleById, noodleExists } from '../../../noodles';
import { notFoundHandler } from '../responses';

export const getFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const file = getNoodleById<FileNoodle>(req.params.id);
        res.json(exportNoodle(file));
    } catch (error) {
        next(error);
    }
};

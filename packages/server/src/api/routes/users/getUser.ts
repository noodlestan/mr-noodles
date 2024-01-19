import type { UserNoodle } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { exportNoodle, getNoodleById, noodleExists } from '../../../noodles';
import { notFoundHandler } from '../responses';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const user = getNoodleById<UserNoodle>(req.params.id);
        res.json(exportNoodle(user));
    } catch (error) {
        next(error);
    }
};

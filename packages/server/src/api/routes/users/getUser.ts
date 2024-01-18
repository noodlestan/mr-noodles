import { UserModel } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { getNoodleById, noodleExists } from '../../../noodles';
import { userToData } from '../../../models/user';
import { notFoundHandler } from '../responses';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const user = getNoodleById<UserModel>(req.params.id);
        res.json(userToData(user));
    } catch (error) {
        next(error);
    }
};

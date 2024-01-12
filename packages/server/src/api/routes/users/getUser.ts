import { NextFunction, Request, Response } from 'express';

import { findUserById } from '../../../controllers/users/findUserById';
import { notFoundHandler } from '../responses';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await findUserById(req.params.id);

        if (!user) {
            notFoundHandler(req, res, next);
            return;
        }
        res.json(user.toDataPublic());
    } catch (error) {
        next(error);
    }
};

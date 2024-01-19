import { NextFunction, Request, Response } from 'express';

import { addRootToUser } from '../../../controllers/users/addRootToUser';
import { noodleExists } from '../../../noodles';
import { canWriteToPath } from '../../../noodles/private/functions/canWriteToPath';
import { defer } from '../../../utils/flow/defer';
import { notFoundHandler, unprocessableHandler } from '../responses';

export const postUserRoot = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { root } = req.body;
        const exists = noodleExists(req.params.id);
        if (!exists) {
            notFoundHandler(req, res, next);
            return;
        }

        const writable = canWriteToPath(root.path);
        if (!writable) {
            unprocessableHandler(req, res, next, 'Path is not writable');
            return;
        }

        const updated = await addRootToUser(req.params.id, root);
        defer(() => res.json(updated), 1000);
    } catch (error) {
        next(error);
    }
};

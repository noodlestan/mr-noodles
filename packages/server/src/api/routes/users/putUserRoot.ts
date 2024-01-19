import type { UserNoodle } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { updateUserRoot } from '../../../controllers/users/updateUserRoot';
import { getNoodleById, noodleExists } from '../../../noodles';
import { canWriteToPath } from '../../../noodles/private/functions/canWriteToPath';
import { defer } from '../../../utils/flow/defer';
import { notFoundHandler, unprocessableHandler } from '../responses';

export const putUserRoot = async (
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

        const user = getNoodleById<UserNoodle>(req.params.id);
        const rootIndex = (user.roots || []).findIndex(r => r.id === root.id);
        if (rootIndex < 0) {
            notFoundHandler(req, res, next);
            return;
        }

        const updated = await updateUserRoot(req.params.id, root);

        defer(() => res.json(updated), 1000);
        // res.json({ results: data });
    } catch (error) {
        next(error);
    }
};

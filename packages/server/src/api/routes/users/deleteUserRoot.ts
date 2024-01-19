import type { UserNoodle } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { removeRootFromUser } from '../../../controllers/users/removeRootFromUser';
import { getNoodleById, noodleExists } from '../../../noodles';
import { defer } from '../../../utils/flow/defer';
import { notFoundHandler } from '../responses';

export const deleteUserRoot = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { root: rootId } = req.params;
        const exists = noodleExists(req.params.id);
        if (!exists) {
            notFoundHandler(req, res, next);
            return;
        }

        const user = getNoodleById<UserNoodle>(req.params.id);
        const rootIndex = (user.roots || []).findIndex(r => r.id === rootId);
        if (!user.roots || rootIndex < 0) {
            notFoundHandler(req, res, next);
            return;
        }

        const updated = await removeRootFromUser(req.params.id, user.roots[rootIndex]);

        defer(() => res.json(updated), 1000);
        // res.json({ results: data });
    } catch (error) {
        next(error);
    }
};

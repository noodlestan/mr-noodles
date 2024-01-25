import { NextFunction, Request, Response } from 'express';

import { getFiles } from './getFiles';

export const getRecent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.query = { ...req.query, sortBy: 'dateCreated', sortDir: 'desc' };
        return getFiles(req, res, next);
    } catch (error) {
        next(error);
    }
};

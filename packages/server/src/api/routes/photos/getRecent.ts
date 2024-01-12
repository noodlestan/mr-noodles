import { NextFunction, Request, Response } from 'express';

import { getAll } from './getAll';

export const getRecent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { ...filter } = req.query;
        req.query = { ...filter, sortBy: 'dateCreated', sortDir: 'desc' };
        return getAll(req, res, next);
    } catch (error) {
        next(error);
    }
};

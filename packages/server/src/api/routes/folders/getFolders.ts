import querystring, { ParsedUrlQueryInput } from 'node:querystring';

import { NextFunction, Request, Response } from 'express';

import { findFolders } from '../../../controllers/folders/findFolder';
import { folderToData } from '../../../models/folder';
import { FOLDERS_PAGE_MAX, FOLDERS_PAGE_SIZE_DEFAULT } from '../constants';
import { paginationFromQuery, sortFromQuery } from '../functions';

export const getFolders = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { ...filter } = req.query;

        const page = paginationFromQuery(filter, FOLDERS_PAGE_SIZE_DEFAULT, FOLDERS_PAGE_MAX);
        res.setHeader('x-meta-page-no', `${page?.page}`);
        res.setHeader('x-meta-page-size', `${page?.size}`);

        const sort = sortFromQuery(filter, 'title', 'desc');
        res.setHeader('x-meta-sort-by', `${sort}`);

        res.setHeader('x-meta-filter', `${querystring.encode(filter as ParsedUrlQueryInput)}`);

        const folders = findFolders(filter, sort, page);
        const data = folders.map(folderToData);

        res.json(data);
    } catch (error) {
        next(error);
    }
};

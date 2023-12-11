import { QueryOptions } from 'mongoose';

import type { PhotoData, PhotoDocument, PhotoSchema } from '../../models/photo';
import { Photo } from '../../models/photo';
import { IPagination, ISort, MongoSort } from '../../models/photo/types';

export const getPhotos = async (
    filter: Partial<PhotoData>,
    page?: IPagination,
    sort?: ISort,
): Promise<PhotoDocument[]> => {
    const limit = page?.size;
    const skip = page ? (page.page - 1) * page.size : 0;

    const s: MongoSort = {};
    s[sort?.field || 'date'] = sort?.dir === 'desc' ? -1 : 1;

    const options: QueryOptions<PhotoSchema> = {
        skip,
        limit,
        sort: s,
    };

    return Photo.find(filter, undefined, options);
};

import { QueryOptions } from 'mongoose';

import type { AlbumData, AlbumDocument, AlbumSchema } from '../../models/album';
import { Album } from '../../models/album';
import { IPagination, ISort, MongoSort } from '../../models/types';

export const getAlbums = async (
    filter: Partial<AlbumData>,
    page?: IPagination,
    sort?: ISort,
): Promise<AlbumDocument[]> => {
    const limit = page?.size;
    const skip = page ? (page.page - 1) * page.size : 0;

    const s: MongoSort = {};
    s[sort?.field || 'title'] = sort?.dir === 'desc' ? -1 : 1;

    const options: QueryOptions<AlbumSchema> = {
        skip,
        limit,
        sort: s,
    };

    return Album.find(filter, undefined, options);
};

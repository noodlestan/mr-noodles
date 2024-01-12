import { AlbumData, AlbumSchema, IPagination, ISort } from '@noodlestan/shared-types';
import { QueryOptions } from 'mongoose';

import type { AlbumDocument } from '../../models/album';
import { Album } from '../../models/album';
import { MongoSort } from '../../models/types';

export const findAlbums = async (
    filterBy: Partial<AlbumData>,
    page?: IPagination,
    sort?: ISort[],
): Promise<AlbumDocument[]> => {
    const limit = page?.size;
    const skip = page ? (page.page - 1) * page.size : 0;

    const s: MongoSort = {};
    sort?.forEach(({ field, dir }) => {
        s[field] = dir === 'desc' ? -1 : 1;
    });

    const options: QueryOptions<AlbumSchema> = {
        skip,
        limit,
        sort: s,
    };

    return Album.find(filterBy, undefined, options);
};

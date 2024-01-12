import { IPagination, ISort, UserFilter, UserSchema } from '@noodlestan/shared-types';
import { FilterQuery, QueryOptions } from 'mongoose';

import { MongoSort } from '../../models/types';
import type { UserDocument } from '../../models/user';
import { User } from '../../models/user';
import { pushPatternFilter } from '../functions';

export const findUsers = async (
    filterBy: UserFilter,
    page?: IPagination,
    sort?: ISort[],
): Promise<UserDocument[]> => {
    const $and: FilterQuery<UserDocument>[] = [];

    const { name } = filterBy;

    pushPatternFilter($and, 'name', name);

    const limit = page?.size;
    const skip = page ? (page.page - 1) * page.size : 0;

    const s: MongoSort = {};
    sort?.forEach(({ field, dir }) => {
        s[field] = dir === 'desc' ? -1 : 1;
    });

    const options: QueryOptions<UserSchema> = {
        skip,
        limit,
        sort: s,
    };

    const filter = $and.length ? { $and } : {};

    return User.find(filter, undefined, options);
};

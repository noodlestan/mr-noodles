import { IPagination, ISort, UserFilter, UserModel } from '@noodlestan/shared-types';

import { findNoodles } from '../../db';
import { matchPattern } from '../../db/functions/matchPattern';

export type FilterQuery<T> = {
    [P in keyof T]?: (noodle: T) => boolean;
};

export const findUsers = (
    filterBy?: UserFilter,
    sort?: ISort[],
    page?: IPagination,
): UserModel[] => {
    const { name } = filterBy || {};

    const filter = (n: UserModel) => {
        if (n.type !== 'user') {
            return false;
        }
        if (!matchPattern(n.name, name)) {
            return false;
        }
        return true;
    };

    return findNoodles<UserModel>(filter, sort, page);
};

import type { IPagination, ISort, UserFilter, UserNoodle } from '@noodlestan/shared-types';

import { findNoodles } from '../../noodles';
import { matchPattern } from '../../noodles/functions/matchPattern';

export type FilterQuery<T> = {
    [P in keyof T]?: (noodle: T) => boolean;
};

export const findUsers = (
    filterBy?: UserFilter,
    sort?: ISort[],
    page?: IPagination,
): UserNoodle[] => {
    const { name } = filterBy || {};

    const filter = (n: UserNoodle) => {
        if (n.type !== 'user') {
            return false;
        }
        if (!matchPattern(n.name, name)) {
            return false;
        }
        return true;
    };

    return findNoodles<UserNoodle>(filter, sort, page);
};

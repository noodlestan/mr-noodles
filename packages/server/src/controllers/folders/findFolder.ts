import type { FolderNoodle, IPagination, ISort } from '@noodlestan/shared-types';

import { findNoodles } from '../../noodles';

export const findFolders = (
    filterBy: Partial<FolderNoodle>,
    sort?: ISort[],
    page?: IPagination,
): FolderNoodle[] => {
    const filter = (n: FolderNoodle) => {
        if (n.type !== 'folder') {
            return false;
        }
        return true;
    };

    return findNoodles<FolderNoodle>(filter, sort, page);
};

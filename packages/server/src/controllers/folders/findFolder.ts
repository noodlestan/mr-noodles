import { FolderData, FolderModel, IPagination, ISort } from '@noodlestan/shared-types';

import { findNoodles } from '../../db';

export const findFolders = (
    filterBy: Partial<FolderData>,
    sort?: ISort[],
    page?: IPagination,
): FolderModel[] => {
    const filter = (n: FolderModel) => {
        if (n.type !== 'folder') {
            return false;
        }
        return true;
    };

    return findNoodles<FolderModel>(filter, sort, page);
};

import { FolderModel } from '@noodlestan/shared-types';

import { addNoodle, noodleExists } from '../../db';
import { folderFromData } from '../../models/folder';

export const createFolderFromSlugAndTitle = async (
    slug: string,
    title: string,
): Promise<FolderModel> => {
    const folder = folderFromData({
        // slug,
        title,
    });
    if (noodleExists(folder.id)) {
        throw new Error(`duplicate key ${folder.id}`);
    }
    await addNoodle(folder);

    return folder;
};

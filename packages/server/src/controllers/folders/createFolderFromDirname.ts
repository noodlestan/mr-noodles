import { FolderModel } from '@noodlestan/shared-types';

import { addNoodle, getNoodleById, noodleExists } from '../../noodles';
import { folderFromData } from '../../models/folder';

export const createFolderFromDirname = async (dirname: string): Promise<FolderModel> => {
    const folder = folderFromData({
        filename: dirname,
    });
    if (noodleExists(folder.id)) {
        return getNoodleById<FolderModel>(folder.id);
    }
    await addNoodle(folder);

    return folder;
};

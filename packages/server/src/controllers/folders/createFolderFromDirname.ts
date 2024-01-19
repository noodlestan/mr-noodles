import type { FolderNoodle, Root } from '@noodlestan/shared-types';
import { createFolder } from '@noodlestan/shared-types';

import { addNoodle, getNoodleById, noodleExists } from '../../noodles';

export const createFolderFromDirname = async (
    dirname: string,
    root: Root,
): Promise<FolderNoodle> => {
    const folder = createFolder(
        {
            filename: dirname,
        },
        root,
    );
    if (noodleExists(folder.id)) {
        return getNoodleById<FolderNoodle>(folder.id);
    }
    await addNoodle(folder);

    return folder;
};

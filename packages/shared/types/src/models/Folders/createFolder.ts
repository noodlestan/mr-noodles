import { createNoodle } from '../Noodles/index.js';
import { stripRootPath } from '../functions/stripRootPath.js';
import { Root } from '../types.js';

import { importFolderData } from './importFolderData.js';
import { FolderNoodle } from './types.js';

export const createFolder = (
    data: Partial<FolderNoodle>,
    root: Root,
    absoluteFilename?: string,
): FolderNoodle => {
    const filename = stripRootPath(root, absoluteFilename);
    const noodle = createNoodle({ ...data, filename }, root);

    const { type, ...folder } = importFolderData(data);
    if (type && type !== 'folder') {
        throw new Error('Invalid arguments');
    }

    return {
        ...noodle,
        type: 'folder',
        ...folder,
    };
};

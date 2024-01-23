import { createNoodle } from '../Noodles';
import { stripRootPath } from '../functions/stripRootPath';
import { Root } from '../types';

import { importFolderData } from './importFolderData';
import { FolderNoodle } from './types';

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

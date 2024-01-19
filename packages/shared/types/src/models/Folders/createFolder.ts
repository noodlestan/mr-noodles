import { createNoodle } from '../Noodles';
import { Root } from '../types';

import { importFolderData } from './importFolderData';
import { FolderNoodle } from './types';

export const createFolder = (partial: Partial<FolderNoodle>, root: Root): FolderNoodle => {
    const noodle = createNoodle(partial, root);

    const { type, ...folder } = importFolderData(partial);

    if (type && type !== 'folder') {
        throw new Error('Invalid arguments');
    }

    return {
        ...noodle,
        type: 'folder',
        ...folder,
    };
};

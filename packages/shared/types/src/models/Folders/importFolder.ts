import { importNoodle } from '../Noodles/index.js';

import { importFolderData } from './importFolderData.js';
import { FolderNoodle } from './types.js';

export const importFolder = (data: FolderNoodle): FolderNoodle => {
    const noodle = importNoodle<FolderNoodle>(data);
    const folder = importFolderData(data);

    return {
        ...noodle,
        ...folder,
    };
};

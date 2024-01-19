import { importNoodle } from '../Noodles';

import { importFolderData } from './importFolderData';
import { FolderNoodle } from './types';

export const importFolder = (data: FolderNoodle): FolderNoodle => {
    const noodle = importNoodle<FolderNoodle>(data);
    const folder = importFolderData(data);

    return {
        ...noodle,
        ...folder,
    };
};

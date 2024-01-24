import { importFile } from '../Files/index.js';

import { importMediaFileData } from './importMediaFileData.js';
import { MediaFileNoodle } from './types.js';

export function importMediaFile<T extends MediaFileNoodle>(data: T): T {
    const file = importFile<T>(data);
    const mediaFile = importMediaFileData(file);

    return {
        ...file,
        ...mediaFile,
    } as T;
}

import { importFile } from '../Files';

import { importMediaFileData } from './importMediaFileData';
import { MediaFileNoodle } from './types';

export function importMediaFile<T extends MediaFileNoodle>(data: T): T {
    const file = importFile<T>(data);
    const mediaFile = importMediaFileData(data);

    return {
        ...file,
        ...mediaFile,
    } as T;
}

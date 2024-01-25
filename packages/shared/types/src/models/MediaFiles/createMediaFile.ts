import { createFile } from '../Files/index.js';
import { Root } from '../types.js';

import { importMediaFileData } from './importMediaFileData.js';
import { MediaFileNoodle } from './types.js';

export function createMediaFile<T extends MediaFileNoodle>(
    data: Partial<T>,
    root: Root,
    absoluteFilename?: string,
): T {
    const file = createFile<T>(data, root, absoluteFilename);

    const { hash, orientation, width, height, ...mediaFile } = importMediaFileData(file);

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (hash === undefined) {
        throw new Error('Invalid hash');
    }

    if (orientation === undefined) {
        throw new Error('Invalid orientation');
    }

    if (!width) {
        throw new Error('Invalid width');
    }

    if (!height) {
        throw new Error('Invalid height');
    }

    return {
        ...file,
        ...mediaFile,
        mediaType: '<unknown>',
        hash,
        orientation,
        width,
        height,
    } as T;
}

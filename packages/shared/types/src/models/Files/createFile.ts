import { createNoodle } from '../Noodles/index.js';
import { stripRootPath } from '../functions/stripRootPath.js';
import { Root } from '../types.js';

import { importFileData } from './importFileData';
import { FileNoodle } from './types.js';

export function createFile<T extends FileNoodle>(
    data: Partial<T>,
    root: Root,
    absoluteFilename?: string,
): T {
    const filename = stripRootPath(root, absoluteFilename);
    const noodle = createNoodle<FileNoodle>({ ...data, filename }, root);

    const file = importFileData(data);

    return {
        ...noodle,
        ...file,
        type: 'file',
    } as T;
}

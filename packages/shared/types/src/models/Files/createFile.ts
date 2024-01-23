import { createNoodle } from '../Noodles';
import { stripRootPath } from '../functions/stripRootPath';
import { Root } from '../types';

import { importFileData } from './importFileData';
import { FileNoodle } from './types';

export function createFile<T extends FileNoodle>(
    data: Partial<T>,
    root: Root,
    absoluteFilename?: string,
): T {
    const filename = stripRootPath(root, absoluteFilename);
    const noodle = createNoodle<FileNoodle>({ ...data, filename }, root);

    const { type, ...file } = importFileData(data);
    if (type && type !== 'file') {
        throw new Error('Invalid type');
    }

    return {
        ...noodle,
        ...file,
        type: 'file',
    } as T;
}

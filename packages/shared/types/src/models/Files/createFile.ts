import { createNoodle } from '../Noodles';
import { Root } from '../types';

import { importFileData } from './importFileData';
import { FileNoodle } from './types';

export function createFile<T extends FileNoodle>(data: Partial<T>, root: Root): T {
    const noodle = createNoodle<FileNoodle>(data, root);

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

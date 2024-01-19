import { generateId } from '../functions/generateId';
import { Root } from '../types';

import { importNoodleData } from './importNoodleData';
import { BaseNoodle } from './types';

export function createNoodle<T extends BaseNoodle>(data: Partial<T>, root: Root): T {
    const { id, filename, dateCreated, dateUpdated, ...rest } = importNoodleData(data);

    if (!filename) {
        throw new Error('Invalid filename');
    }
    if (!root) {
        throw new Error('Invalid root');
    }
    if (!root.system && !root.owner) {
        throw new Error('Invalid owner');
    }

    const hash = generateId(filename);

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (id && id !== hash) {
        throw new Error(`Invalid id hash "${id}"`);
    }

    return {
        ...rest,
        id: hash,
        type: '<unknown>',
        filename,
        dateCreated,
        dateUpdated,
        root: root.id,
        owner: root.owner || 'system',
    } as T;
}

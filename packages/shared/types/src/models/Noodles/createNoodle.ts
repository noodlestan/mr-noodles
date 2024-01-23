import { generateId } from '../functions/generateId';
import { Root } from '../types';

import { importNoodleData } from './importNoodleData';
import { BaseNoodle } from './types';

export function createNoodle<T extends BaseNoodle>(data: Partial<T>, root: Root): T {
    const { id, filename, dateCreated, dateUpdated, ...rest } = importNoodleData(data);
    if (!filename) {
        throw new Error('Invalid filename');
    }
    if (!root || !root.path) {
        throw new Error('Invalid root');
    }
    if (!root.system && !root.owner) {
        throw new Error('Invalid owner');
    }

    const hashId = generateId(root, filename);
    if (id && id !== hashId) {
        throw new Error(`Invalid id hash "${id}"`);
    }

    return {
        ...rest,
        id: hashId,
        type: '<unknown>',
        filename,
        dateCreated,
        dateUpdated,
        root: root.id,
        owner: root.owner || 'system',
    } as T;
}

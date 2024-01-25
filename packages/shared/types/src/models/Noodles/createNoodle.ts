import { generateId } from '../functions/generateId.js';
import { Root } from '../types.js';

import { importNoodleData } from './importNoodleData.js';
import { BaseNoodle } from './types.js';

export function createNoodle<T extends BaseNoodle>(data: Partial<T>, root: Root): T {
    const { id, filename, dateUpdated, ...rest } = importNoodleData(data);
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
        dateCreated: new Date(),
        dateUpdated,
        root: root.id,
        owner: root.owner || 'system',
    } as T;
}

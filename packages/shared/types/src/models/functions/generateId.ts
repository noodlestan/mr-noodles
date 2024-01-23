import md5 from 'md5';

import { Root } from '../types';

export const generateId = (root: Root, filename: string): string => {
    if (!filename) {
        throw new Error('Can not generate id from empty string');
    }
    if (!root.id) {
        throw new Error('Invalid root (empty id)');
    }
    return md5(root.id + filename);
};

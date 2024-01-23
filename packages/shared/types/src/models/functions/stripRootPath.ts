import { Root } from '../types.js';

const doubleSlash = /\/\//g;

export const stripRootPath = (root: Root, filename?: string): string => {
    if (!filename) {
        throw new Error('Invalid filename (empty)');
    }
    if (!filename.startsWith(root.path)) {
        throw new Error('Filename is not within root');
    }
    return filename.replace(root.path, '/').replace(doubleSlash, '/');
};

import { lstat } from 'fs/promises';

import { log } from '../../../logger';
import { Root } from '../../types';

import { dropDir } from './dropDir';

export const dropRoot = async (root: Root): Promise<void> => {
    const { path } = root;

    const stat = await lstat(path);

    if (!stat.isDirectory()) {
        throw new Error(`Not a valid root: ${path}`);
    }

    await dropDir(root, path);

    log().info('noodlesdropRoot', { path });
};

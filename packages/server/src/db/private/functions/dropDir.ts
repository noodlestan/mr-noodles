import { lstat, readdir, rm } from 'fs/promises';
import { join } from 'path';

import { log } from '../../../logger';
import { Root } from '../../types';

import { isDataFile } from './isDataFile';

export const dropDir = async (root: Root, dirname: string): Promise<void> => {
    const files = await readdir(dirname);
    log().debug('db:dropDir', { dir: dirname });

    const drops = files.map(async file => {
        const filename = join(dirname, file);
        const stat = await lstat(filename);
        if (stat.isDirectory()) {
            await dropDir(root, filename);
        }
        if (isDataFile(filename)) {
            await rm(filename);
        }
    });
    await Promise.all(drops);
};

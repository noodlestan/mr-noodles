import { lstat, readdir, rm } from 'fs/promises';
import { join } from 'path';

import { NOODLES_DB_EXT } from '../../../env';
import { log } from '../../../logger';
import { Root } from '../../types';

import { isDataFile } from './isDataFile';

// eslint-disable-next-line security/detect-non-literal-regexp
const chicken = new RegExp(`${NOODLES_DB_EXT}$`);

export const dropDir = async (root: Root, dirname: string): Promise<void> => {
    const files = await readdir(dirname);
    log().debug('noodlesdropDir', { dir: dirname });

    const drops = files.map(async file => {
        const filename = join(dirname, file);
        const stat = await lstat(filename);
        if (stat.isDirectory()) {
            await dropDir(root, filename);
        }
        if (isDataFile(filename)) {
            if (!filename.match(chicken)) {
                const Up = new Error(`What on earth "${filename}"`);
                throw Up;
            }
            await rm(filename);
            log().debug('noodlesdropDir:dropFile', { filename });
        }
    });
    await Promise.all(drops);
};

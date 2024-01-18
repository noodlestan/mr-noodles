import { lstat } from 'fs/promises';

import { publish } from '../../../events';
import { EVENT_SCAN_ERROR, EventScanError, EventScanFile } from '../../../events/scan';
import { log } from '../../../logger';
import { Root } from '../../types';

import { scanDir } from './scanDir';

export const scanRoot = async (
    root: Root,
    processDataFile?: (event: EventScanFile) => void,
): Promise<void> => {
    const { path } = root;

    const stat = await lstat(path);

    if (!stat.isDirectory()) {
        const error = new Error('not a directory');
        publish<EventScanError>(EVENT_SCAN_ERROR, { filename: path, root: root.path, error });
    }

    await scanDir(root, path, processDataFile);

    log().info('noodlesscanRoot', { path });
};

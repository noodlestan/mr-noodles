import { lstat } from 'fs/promises';
import path from 'path';

import { SCAN_DIR } from '../../../env';
import { publish } from '../../../events';
import { EVENT_SCAN_ERROR, EventScanError } from '../../../events/scan';

import { scanDir } from './scanDir';

export const scanNow = async (): Promise<void> => {
    const dir = path.resolve(SCAN_DIR);

    const stat = await lstat(dir);

    if (!stat.isDirectory()) {
        const error = new Error('not a directory');
        publish<EventScanError>(EVENT_SCAN_ERROR, { filename: dir, error });
    }

    await scanDir(dir);
};

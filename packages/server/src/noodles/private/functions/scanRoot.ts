import { lstat } from 'fs/promises';

import type { Root } from '@noodlestan/shared-types';

import { publish } from '../../../events';
import { EVENT_SCAN_ERROR, EventScanError, EventScanFile } from '../../../events/scan';
import { log } from '../../../logger';

import { scanDir } from './scanDir';

export const scanRoot = async (
    root: Root,
    isHardScan?: boolean,
    processDataFile?: (event: EventScanFile) => void,
): Promise<void> => {
    const { path } = root;

    const stat = await lstat(path);

    if (!stat.isDirectory()) {
        const error = new Error('not a directory');
        const event: EventScanError = { filename: path, root, error };
        publish<EventScanError>(EVENT_SCAN_ERROR, event);
    }

    await scanDir(root, path, isHardScan, processDataFile);

    log().info('noodles:scanRoot', { path });
};

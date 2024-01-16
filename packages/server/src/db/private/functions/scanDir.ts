import { readdir } from 'fs/promises';

import { publish } from '../../../events';
import {
    EVENT_SCAN_DIR,
    EVENT_SCAN_ERROR,
    EventScanDir,
    EventScanError,
    EventScanFile,
} from '../../../events/scan';
import { log } from '../../../logger';
import { Root } from '../../types';

import { scanFile } from './scanFile';

export const scanDir = async (
    root: Root,
    dirname: string,
    processDataFile?: (event: EventScanFile) => void,
): Promise<void> => {
    try {
        const files = await readdir(dirname);
        const relativePath = root.path !== dirname ? dirname.substring(root.path.length || 0) : '.';

        log().debug('db:scanDir', { dir: dirname });

        const scans = files.map(async file => scanFile(root, dirname, file, processDataFile));
        await Promise.all(scans);

        publish<EventScanDir>(EVENT_SCAN_DIR, { dirname, root: root.path, relativePath });
    } catch (err) {
        const error = err as Error;
        publish<EventScanError>(EVENT_SCAN_ERROR, { filename: dirname, root: root.path, error });
    }
};
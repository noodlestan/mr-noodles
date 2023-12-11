/* eslint-disable security/detect-non-literal-fs-filename */
import { lstat, readdir } from 'fs/promises';
import path from 'path';

import { SCAN_DIR } from '../../env';
import { publish, subscribe } from '../../events';
import {
    EVENT_SCAN_ERROR,
    EVENT_SCAN_FILE,
    EventScanError,
    EventScanFile,
} from '../../events/scan';
import { logger } from '../../logger';

const scanDir = async (dir: string, base?: string): Promise<void> => {
    const files = await readdir(dir);

    files.forEach(async file => {
        const filename = path.join(dir, file);
        const baseDir = base || dir;
        const relativePath = base ? dir.substring(base?.length || 0) : '.';

        const stat = await lstat(filename);
        if (stat.isDirectory()) {
            scanDir(filename, base || dir);
        } else {
            publish<EventScanFile>(EVENT_SCAN_FILE, { filename, baseDir, relativePath });
        }
    });
};

const scanNow = async (): Promise<void> => {
    const dir = path.resolve(SCAN_DIR);

    const stat = await lstat(dir);

    if (!stat.isDirectory()) {
        const error = new Error('not a directory');
        publish<EventScanError>(EVENT_SCAN_ERROR, { filename: dir, error });
    }

    await scanDir(dir);
};

const startScanAgent = (): void => {
    scanNow();
};

export { startScanAgent };

subscribe(EVENT_SCAN_ERROR, (event: EventScanError) => {
    logger.error(EVENT_SCAN_ERROR, event);
});

import { lstat, readdir } from 'fs/promises';
import path from 'path';

import { SCAN_DIR, SCAN_EXTENSIONS } from '../../env';
import { publish, subscribe } from '../../events';
import {
    EVENT_SCAN_ERROR,
    EVENT_SCAN_FILE,
    EventScanError,
    EventScanFile,
} from '../../events/scan';
import { logger } from '../../logger';
import { defer } from '../../utils/flow/defer';

const isImageFile = (filename: string): boolean => {
    const parts = path.parse(filename);
    return SCAN_EXTENSIONS.includes(parts.ext.toLowerCase());
};

const scanFile = async (dir: string, file: string, base: string | undefined) => {
    try {
        const filename = path.join(dir, file);
        const baseDir = base || dir;
        const relativePath = base ? dir.substring(base?.length || 0) : '.';

        const stat = await lstat(filename);
        if (stat.isDirectory()) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            await defer(() => scanDir(filename, base || dir));
        } else if (isImageFile(filename)) {
            publish<EventScanFile>(EVENT_SCAN_FILE, { filename, baseDir, relativePath });
        }
    } catch (err) {
        const error = err as Error;
        publish<EventScanError>(EVENT_SCAN_ERROR, { filename: path.join(dir, file), error });
    }
};

const scanDir = async (dir: string, base?: string): Promise<void> => {
    try {
        const files = await readdir(dir);

        logger.debug('agent:scanner:scan-dir', { dir });

        files.forEach(async file => {
            await scanFile(dir, file, base);
        });
    } catch (err) {
        const error = err as Error;
        publish<EventScanError>(EVENT_SCAN_ERROR, { filename: dir, error });
    }
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
    const error = {
        filename: event.filename,
        reason: event.error.message,
        stack: event.error.stack,
    };
    logger.error('agent:scanner:error', error);
});

import { readdir } from 'fs/promises';

import { publish } from '../../../events';
import { EVENT_SCAN_ERROR, EventScanError } from '../../../events/scan';
import { logger } from '../../../logger';

import { scanFile } from './scanFile';

export const scanDir = async (dir: string, base?: string): Promise<void> => {
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

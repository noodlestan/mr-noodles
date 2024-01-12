import { lstat } from 'fs/promises';
import path from 'path';

import { publish } from '../../../events';
import {
    EVENT_SCAN_ERROR,
    EVENT_SCAN_FILE,
    EventScanError,
    EventScanFile,
} from '../../../events/scan';
import { defer } from '../../../utils/flow/defer';

import { isImageFile } from './isImageFile';
import { scanDir } from './scanDir';

export const scanFile = async (
    dir: string,
    file: string,
    base: string | undefined,
): Promise<void> => {
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

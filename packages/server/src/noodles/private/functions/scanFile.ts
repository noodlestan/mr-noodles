import { lstat } from 'fs/promises';
import { join } from 'path';

import type { Root } from '@noodlestan/shared-types';

import { publish } from '../../../events';
import {
    EVENT_SCAN_DATA,
    EVENT_SCAN_ERROR,
    EVENT_SCAN_FILE,
    EventScanError,
    EventScanFile,
} from '../../../events/scan';
import { defer } from '../../../utils/flow/defer';

import { isDataFile } from './isDataFile';
import { isScannableFile } from './isScannableFile';
import { scanDir } from './scanDir';

export const scanFile = async (
    root: Root,
    dirname: string,
    file: string,
    isHardScan?: boolean,
    processDataFile?: (event: EventScanFile) => void,
): Promise<void> => {
    const filename = join(dirname, file);
    try {
        const relativePath = root.path !== dirname ? dirname.substring(root.path.length || 0) : '.';

        const stat = await lstat(filename);
        if (stat.isDirectory()) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            await defer(() => scanDir(root, filename, isHardScan, processDataFile));
        } else if (isDataFile(filename)) {
            const event = {
                filename,
                relativePath,
                root,
            };
            if (processDataFile) {
                await processDataFile(event);
            } else {
                publish<EventScanFile>(EVENT_SCAN_DATA, {
                    filename,
                    relativePath,
                    root,
                });
            }
        } else if (isHardScan && isScannableFile(filename)) {
            publish<EventScanFile>(EVENT_SCAN_FILE, {
                filename,
                relativePath,
                root,
            });
        }
    } catch (err) {
        const error = err as Error;
        publish<EventScanError>(EVENT_SCAN_ERROR, {
            filename,
            error,
            root,
        });
    }
};

import { lstat } from 'fs/promises';
import { join } from 'path';

import { publish } from '../../../events';
import {
    EVENT_SCAN_ERROR,
    EVENT_SCAN_FILE_DATA,
    EVENT_SCAN_FILE_IMAGE,
    EventScanError,
    EventScanFile,
} from '../../../events/scan';
import { defer } from '../../../utils/flow/defer';
import { Root } from '../../types';

import { isDataFile } from './isDataFile';
import { isImageFile } from './isImageFile';
import { scanDir } from './scanDir';

export const scanFile = async (
    root: Root,
    dirname: string,
    file: string,
    processDataFile?: (event: EventScanFile) => void,
): Promise<void> => {
    const filename = join(dirname, file);
    try {
        const relativePath = root.path !== dirname ? dirname.substring(root.path.length || 0) : '.';

        const stat = await lstat(filename);
        if (stat.isDirectory()) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            await defer(() => scanDir(root, filename, processDataFile));
        } else if (isImageFile(filename)) {
            publish<EventScanFile>(EVENT_SCAN_FILE_IMAGE, {
                filename,
                root: root.path,
                relativePath,
            });
        } else if (isDataFile(filename)) {
            const event = {
                filename,
                root: root.path,
                relativePath,
            };
            if (processDataFile) {
                await processDataFile(event);
            } else {
                publish<EventScanFile>(EVENT_SCAN_FILE_DATA, {
                    filename,
                    root: root.path,
                    relativePath,
                });
            }
        }
    } catch (err) {
        const error = err as Error;
        publish<EventScanError>(EVENT_SCAN_ERROR, {
            filename,
            root: root.path,
            error,
        });
    }
};

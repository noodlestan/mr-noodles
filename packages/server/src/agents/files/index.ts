import { queue as CreateQueue, QueueObject } from 'async';

import { subscribe } from '../../events';
import {
    FILE_PROCESS_ERROR,
    FILE_PROCESS_WARNING,
    FileProcessError,
    FileProcessWarning,
} from '../../events/file';
import { EVENT_SCAN_FILE, EventScanFile } from '../../events/scan';
import { log } from '../../logger';

import { processScanFile } from './processScanFile';

const unsubscribeTo: Array<() => void> = [];

const queue = CreateQueue<EventScanFile>(async (event, next) => {
    await processScanFile(event);
    next();
}, 1);

const susbcribeToErrors = () => {
    const errorUnsub1 = subscribe(FILE_PROCESS_ERROR, (event: FileProcessError) => {
        const error = {
            filename: event.filename,
            reason: event.error.message,
            stack: event.error.stack,
        };
        log().error('agent:files:error', error);
    });

    const errorUnsub2 = subscribe(FILE_PROCESS_WARNING, (event: FileProcessWarning) => {
        log().warn('agent:files:warning', {
            filename: event.filename,
            reason: event.reason,
        });
    });

    unsubscribeTo.push(errorUnsub1);
    unsubscribeTo.push(errorUnsub2);
};

const startFilesAgent = async (): Promise<void> => {
    susbcribeToErrors();

    const scanFileUnsub = subscribe<EventScanFile>(EVENT_SCAN_FILE, event => {
        queue.push(event);
    });

    unsubscribeTo.push(scanFileUnsub);
};

const filesAgentQueue = (): QueueObject<EventScanFile> => {
    return queue;
};

const stopFilesAgent = (): void => {
    unsubscribeTo.forEach(unsub => unsub());
};

export { startFilesAgent, filesAgentQueue, stopFilesAgent };

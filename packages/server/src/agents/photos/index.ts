import { queue as CreateQueue, QueueObject } from 'async';

import { createPhotoMessage } from '../../controllers/photo-messages/create';
import { subscribe } from '../../events';
import {
    PHOTO_PROCESS_ERROR,
    PHOTO_PROCESS_WARNING,
    PhotoProcessError,
    PhotoProcessWarning,
} from '../../events/photo';
import { EVENT_SCAN_FILE, EventScanFile } from '../../events/scan';
import { logger } from '../../logger';

import { processScanFile } from './processScanFile';

const unsubscribeTo: Array<() => void> = [];

const queue = CreateQueue<EventScanFile>(async (event, next) => {
    await processScanFile(event);
    next();
}, 10);

const susbcribeToErrors = () => {
    const errorUnsub1 = subscribe(PHOTO_PROCESS_ERROR, (event: PhotoProcessError) => {
        const error = {
            filename: event.filename,
            reason: event.error.message,
            stack: event.error.stack,
        };
        logger.error('agent:photos:error', error);
        createPhotoMessage('error', error.reason, event.filename);
    });

    const errorUnsub2 = subscribe(PHOTO_PROCESS_WARNING, (event: PhotoProcessWarning) => {
        createPhotoMessage('warning', event.reason, event.filename);

        logger.warn('agent:photos:warning', {
            filename: event.filename,
            reason: event.reason,
        });
    });

    unsubscribeTo.push(errorUnsub1);
    unsubscribeTo.push(errorUnsub2);
};

const startPhotosAgent = async (): Promise<void> => {
    susbcribeToErrors();

    const scanFileUnsub = subscribe<EventScanFile>(EVENT_SCAN_FILE, event => {
        queue.push(event);
    });

    unsubscribeTo.push(scanFileUnsub);
};

const photosAgentQueue = (): QueueObject<EventScanFile> => {
    return queue;
};

const stopPhotosAgent = (): void => {
    unsubscribeTo.forEach(unsub => unsub());
};

export { startPhotosAgent, photosAgentQueue, stopPhotosAgent };

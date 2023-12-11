import { queue } from 'async';

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

const startPhotosAgent = async (): Promise<void> => {
    const q = queue<EventScanFile>(async (event, next) => {
        await processScanFile(event);
        next();
    }, 10);

    subscribe<EventScanFile>(EVENT_SCAN_FILE, event => {
        q.push(event);
    });
};

export { startPhotosAgent };

subscribe(PHOTO_PROCESS_ERROR, (event: PhotoProcessError) => {
    const error = {
        message: event.error.message,
        stack: event.error.stack,
    };

    createPhotoMessage('error', error.message, event.filename);

    logger.error('agent:photos:error', {
        filename: event.filename,
        error,
    });
});

subscribe(PHOTO_PROCESS_WARNING, (event: PhotoProcessWarning) => {
    createPhotoMessage('warning', event.message, event.filename);

    logger.warn('agent:photos:warning', {
        filename: event.filename,
        message: event.message,
    });
});

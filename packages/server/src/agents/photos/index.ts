import { subscribe } from '../../events';
import { PHOTO_PROCESS_ERROR, PhotoProcessError } from '../../events/photo';
import { EVENT_SCAN_FILE, EventScanFile } from '../../events/scan';
import { logger } from '../../logger';

import { processScanFile } from './processScanFile';

const startPhotosAgent = async (): Promise<void> => {
    subscribe<EventScanFile>(EVENT_SCAN_FILE, processScanFile);
};

export { startPhotosAgent };

subscribe(PHOTO_PROCESS_ERROR, (event: PhotoProcessError) => {
    const details = {
        stack: event.error.stack,
    };
    logger.error(PHOTO_PROCESS_ERROR, {
        reason: event.error.message,
        filename: event.filename,
        ...details,
    });
});

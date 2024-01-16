import sharp from 'sharp';

import { createPhotoFromScanEvent } from '../../controllers/photos/createPhotoFromScanEvent';
import { findPhotoByFilenameOrHash } from '../../controllers/photos/findPhotoByFilenameOrHash';
import { updatePhotoFromScanEvent } from '../../controllers/photos/updatePhotoFromScanEvent';
import { publish } from '../../events';
import { PHOTO_PROCESS_ERROR, PhotoProcessError } from '../../events/photo';
import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';

import { hashFile } from './utils/hashFile';
import { readExif } from './utils/readExif';

export const processScanFile = async (event: EventScanFile): Promise<void> => {
    log().debug('agent:photos:process-scan', {
        filename: event.filename,
    });

    try {
        const file = await sharp(event.filename);
        const meta = await file.metadata();
        const exif = await readExif(event.filename);
        const buff = await file.toBuffer();
        const hash = hashFile(buff);

        const photo = findPhotoByFilenameOrHash(event.filename, hash);

        if (photo !== undefined) {
            await updatePhotoFromScanEvent(event, photo, hash, meta, exif);
        } else {
            await createPhotoFromScanEvent(event, hash, meta, exif);
        }
    } catch (err) {
        publish<PhotoProcessError>(PHOTO_PROCESS_ERROR, {
            filename: event.filename,
            error: err as Error,
        });
    }
};

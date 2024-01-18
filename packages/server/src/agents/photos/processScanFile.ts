import sharp from 'sharp';

import { createPhotoFromScanEvent } from '../../controllers/photos/createPhotoFromScanEvent';
import { findPhotoByFilename } from '../../controllers/photos/findPhotoByFilename';
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

        const photo = findPhotoByFilename(event.filename);

        if (photo !== undefined) {
            // TODO optional
            // const hash = hashFile(buff);
            await updatePhotoFromScanEvent(event, photo, meta, exif);
        } else {
            const hash = hashFile(buff);
            await createPhotoFromScanEvent(event, hash, meta, exif);
        }
    } catch (err) {
        publish<PhotoProcessError>(PHOTO_PROCESS_ERROR, {
            filename: event.filename,
            error: err as Error,
        });
    }
};

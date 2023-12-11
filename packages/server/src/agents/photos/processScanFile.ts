import crypto from 'crypto';

import sharp from 'sharp';

import { createPhotoFromScanEvent } from '../../controllers/photos/createPhotoFromScanEvent';
import { updatePhotoFromScanEvent } from '../../controllers/photos/updatePhotoFromScanEvent';
import { readExif } from '../../controllers/photos/utils/readExif';
import { publish } from '../../events';
import { PHOTO_PROCESS_ERROR, PhotoProcessError } from '../../events/photo';
import { EventScanFile } from '../../events/scan';
import { Photo } from '../../models/photo';

export const processScanFile = async (event: EventScanFile): Promise<void> => {
    try {
        const file = await sharp(event.filename);
        const meta = await file.metadata();
        const exif = await readExif(event.filename);
        const buff = await file.toBuffer();
        const hash = crypto.createHash('md5').update(buff).digest('hex');

        const photo = await Photo.findByHashOrFilename(hash, event.filename);

        if (!photo) {
            await createPhotoFromScanEvent(event, hash, meta, exif);
        } else {
            await updatePhotoFromScanEvent(event, photo, hash, meta, exif);
        }
    } catch (err) {
        publish<PhotoProcessError>(PHOTO_PROCESS_ERROR, {
            filename: event.filename,
            error: err as Error,
        });
    }
};

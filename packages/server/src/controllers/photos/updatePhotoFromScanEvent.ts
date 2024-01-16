import { PhotoModel } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { updateNoodle } from '../../db';
import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';

import { applyPhotoUpdates } from './functions/applyPhotoUpdates';

export const updatePhotoFromScanEvent = async (
    event: EventScanFile,
    photo: PhotoModel,
    hash: string,
    meta: Metadata,
    exif?: ExifData,
): Promise<void> => {
    const { changed, value: updated } = applyPhotoUpdates(event, photo, hash, meta, exif);

    if (changed) {
        updateNoodle(updated);
        log().debug('controller:photos:update-from-scan', {
            filename: photo.filename,
        });
    }
};

import { PhotoModel } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { updateNoodle } from '../../noodles';

import { applyPhotoUpdates } from './functions/applyPhotoUpdates';

export const updatePhotoFromScanEvent = async (
    event: EventScanFile,
    photo: PhotoModel,
    // hash: string, TODO optional
    meta: Metadata,
    exif?: ExifData,
): Promise<void> => {
    const { changed, value: updated } = applyPhotoUpdates(event, photo, meta, exif);

    if (changed) {
        updateNoodle(updated);
        log().debug('controller:photos:update-from-scan', {
            filename: photo.filename,
        });
    }
};

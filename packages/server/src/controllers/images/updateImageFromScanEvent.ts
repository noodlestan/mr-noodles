import type { ImageNoodle } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { updateNoodle } from '../../noodles';

import { applyImageUpdates } from './applyImageUpdates';

export const updateImageFromScanEvent = async (
    event: EventScanFile,
    image: ImageNoodle,
    meta: Metadata,
    exif?: ExifData,
    hash?: string,
): Promise<void> => {
    const { changed, value: updated } = applyImageUpdates(event, image, meta, exif, hash);

    if (changed) {
        updateNoodle(updated);
        log().debug('controller:images:update-from-scan', {
            filename: image.filename,
        });
    }
};

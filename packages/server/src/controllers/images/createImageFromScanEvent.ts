import { type ImageNoodle, createImage } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { addNoodle } from '../../noodles';
import { dateFromExifDate } from '../files/functions/dateFromExifDate';
import { latLongFromExifGps } from '../files/functions/latLongFromExifGps';

export const createImageFromScanEvent = async (
    event: EventScanFile,
    hash: string,
    meta: Metadata,
    exif?: ExifData,
): Promise<void> => {
    const exifDate = exif && dateFromExifDate(exif);
    const dateTaken = exifDate ? exifDate.toISOString() : undefined;

    const location = exif && latLongFromExifGps(exif);
    const data = {
        hash,
        // TODO store hash date
        // hashDate: new Date(),
        filename: event.filename,
        dateTaken,
        orientation: meta.orientation || 0,
        width: meta.width,
        height: meta.height,
        location,
    };
    const image = createImage(data as Partial<ImageNoodle>, event.root);

    await addNoodle(image);

    log().debug('controller:files:images:create-from-scan', {
        filename: image.filename,
    });
};

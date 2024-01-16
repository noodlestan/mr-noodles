import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { addNoodle } from '../../db';
import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { photoFromData } from '../../models/photo';

import { dateFromExifDate } from './functions/dateFromExifDate';
import { latLongFromExifGps } from './functions/latLongFromExifGps';

export const createPhotoFromScanEvent = async (
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
        filename: event.filename,
        dateTaken,
        orientation: meta.orientation || 0,
        width: meta.width,
        height: meta.height,
        location,
    };
    const photo = photoFromData(data);

    await addNoodle(photo);

    log().debug('controller:photos:create-from-scan', {
        filename: photo.filename,
    });
};

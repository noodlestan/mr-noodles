import type { VideoNoodle } from '@noodlestan/shared-types';
import { createVideo } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { addNoodle } from '../../noodles';
import { dateFromExifDate } from '../files/functions/dateFromExifDate';
import { latLongFromExifGps } from '../files/functions/latLongFromExifGps';

export const createVideoFromScanEvent = async (
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
        dateTaken,
        orientation: meta.orientation || 0,
        width: meta.width,
        height: meta.height,
        location,
    };
    const photo = createVideo(data as Partial<VideoNoodle>, event.root, event.filename);

    await addNoodle(photo);

    log().debug('controller:files:videos:create-from-scan', {
        filename: photo.filename,
    });
};

import { PhotoModel } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../../events/scan';

import { latLongFromExifGps } from './latLongFromExifGps';

export const applyPhotoUpdates = (
    event: EventScanFile,
    photo: PhotoModel,
    // hash: string, TODO optional
    meta: Metadata,
    exif?: ExifData,
): {
    changed: boolean;
    value: PhotoModel;
} => {
    const { filename } = event;
    const { orientation = photo.orientation, width = photo.width, height = photo.height } = meta;

    let changed = false;
    changed = changed || event.filename !== photo.filename;
    changed = changed || orientation !== photo.orientation;
    changed = changed || width !== photo.width;
    changed = changed || height !== photo.height;

    const location = (exif && latLongFromExifGps(exif)) || photo.location;
    changed =
        changed || location?.lat !== photo.location?.lat || location?.long !== photo.location?.long;

    // const hashChanged = hash !== photo.hash;
    // TODO store last hashDate
    // const hashDate = hashChanged ? new Date() : photo.hashDate;

    return {
        // changed: changed || hashChanged,
        changed,
        value: { ...photo, filename, orientation, width, height, dateUpdated: new Date() },
    };
};

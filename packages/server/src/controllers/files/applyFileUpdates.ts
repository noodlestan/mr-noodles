import type { MediaFileNoodle } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';

import { latLongFromExifGps } from './functions/latLongFromExifGps';

export function applyFileUpdates<T extends MediaFileNoodle>(
    event: EventScanFile,
    file: T,
    meta: Metadata,
    exif?: ExifData,
    hash?: string, // TODO optional
): {
    changed: boolean;
    value: T;
} {
    const { filename } = event;
    const { orientation = file.orientation, width = file.width, height = file.height } = meta;

    let changed = false;
    changed = changed || event.filename !== file.filename;
    changed = changed || orientation !== file.orientation;
    changed = changed || width !== file.width;
    changed = changed || height !== file.height;

    const location = (exif && latLongFromExifGps(exif)) || file.location;
    changed =
        changed || location?.lat !== file.location?.lat || location?.long !== file.location?.long;

    const hashChanged = hash && hash !== file.hash;
    const dateHashed = hashChanged ? new Date() : file.dateHashed;

    return {
        // changed: changed || hashChanged,
        changed,
        value: {
            ...file,
            filename,
            hash: hash || file.hash,
            dateHashed,
            orientation,
            width,
            height,
            location,
            dateUpdated: new Date(),
        },
    };
}

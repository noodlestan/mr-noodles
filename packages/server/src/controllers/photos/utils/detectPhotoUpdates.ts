import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../../events/scan';
import { PhotoDocument } from '../../../models/photo';
import { MongoPoint } from '../../../models/types';

import { albumNameFromRelativePath } from './albumNameFromRelativePath';
import { latLongFromExifGps } from './latLongFromExifGps';

type Updates = {
    [key: string]: string | number | boolean | undefined | MongoPoint;
};

// type UpdateQuery<PhotoDocument>
type UpdateFields = {
    $set?: Updates;
    $unset?: Updates;
};

export const detectPhotoUpdates = (
    event: EventScanFile,
    photo: PhotoDocument,
    hash: string,
    meta: Metadata,
    exif?: ExifData,
): UpdateFields | undefined => {
    const set: Updates = {};
    const unset: Updates = {};

    if (event.filename !== photo.filename) {
        set.filename = event.filename;
    }
    if (hash && hash !== photo.hash) {
        set.hash = hash;
    }

    const albumSlug = albumNameFromRelativePath(event.relativePath);
    if (albumSlug !== photo.album) {
        if (albumSlug) {
            set.album = albumSlug;
        } else {
            unset.album = true;
        }
    }

    const { orientation, width, height } = meta;
    if (orientation && orientation !== photo.orientation) {
        set.orientation = orientation;
    }
    if (width && width !== photo.width) {
        set.width = width;
    }
    if (height && height !== photo.height) {
        set.height = height;
    }

    const location = exif && latLongFromExifGps(exif);
    if (
        location &&
        (location.lat !== photo.location?.coordinates[0] ||
            location.long !== photo.location?.coordinates[1])
    ) {
        const { lat, long } = location;
        set.location = {
            type: 'Point',
            coordinates: [lat, long],
        };
    }

    if (set || unset) {
        return {
            $set: set,
            $unset: unset,
        };
    }
};

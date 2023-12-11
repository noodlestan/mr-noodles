import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { Photo } from '../../models/photo';
import { createAlbumFromSlugAndPhotoId } from '../albums/createAlbumFromSlugAndPhotoId';
import { ensurePhotoInAlbum } from '../albums/ensurePhotoInAlbum';

import { albumNameFromRelativePath } from './utils/albumNameFromRelativePath';
import { dateFromExifDate } from './utils/dateFromExifDate';
import { latLongFromExifGps } from './utils/latLongFromExifGps';

export const createPhotoFromScanEvent = async (
    event: EventScanFile,
    hash: string,
    meta: Metadata,
    exif: ExifData,
): Promise<void> => {
    const albumSlug = albumNameFromRelativePath(event.relativePath);

    const location = latLongFromExifGps(exif);
    const photo = Photo.fromData({
        dateCreated: dateFromExifDate(exif),
        hash,
        filename: event.filename,
        album: albumSlug,
        date: new Date(),
        orientation: meta.orientation || 0,
        width: meta.width,
        height: meta.height,
        location,
    });

    await photo.save();

    if (albumSlug) {
        try {
            await createAlbumFromSlugAndPhotoId(albumSlug, photo.id);
        } catch (err) {
            const message = (err as Error).message;
            if (!/duplicate key error collection/.test(message)) {
                throw err;
            }

            await ensurePhotoInAlbum(photo.id, albumSlug);
        }
    }
};

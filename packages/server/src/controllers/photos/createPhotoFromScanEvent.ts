import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { Photo } from '../../models/photo';
import { albumSlugFromRelativePath } from '../albums/albumSlugFromRelativePath';
import { albumTitleFromRelativePath } from '../albums/albumTitleFromRelativePath';
import { createAlbumFromSlugTitleAndPhotoId } from '../albums/createAlbumFromSlugTitleAndPhotoId';
import { ensurePhotoInAlbum } from '../albums/ensurePhotoInAlbum';

import { dateFromExifDate } from './utils/dateFromExifDate';
import { latLongFromExifGps } from './utils/latLongFromExifGps';

export const createPhotoFromScanEvent = async (
    event: EventScanFile,
    hash: string,
    meta: Metadata,
    exif?: ExifData,
): Promise<void> => {
    const albumSlug = albumSlugFromRelativePath(event.relativePath);
    const albumTitle = albumTitleFromRelativePath(event.relativePath);

    const location = exif && latLongFromExifGps(exif);
    const photo = Photo.fromData({
        dateCreated: new Date(),
        hash,
        filename: event.filename,
        album: albumSlug,
        date: exif && dateFromExifDate(exif),
        orientation: meta.orientation || 0,
        width: meta.width,
        height: meta.height,
        location,
    });

    await photo.save();

    log().debug('controller:photos:create-from-scan', {
        filename: photo.filename,
        album: albumSlug,
    });

    if (albumSlug) {
        try {
            await createAlbumFromSlugTitleAndPhotoId(albumSlug, albumTitle, photo.id);
        } catch (err) {
            const message = (err as Error).message;
            if (!/duplicate key error collection/.test(message)) {
                throw err;
            }

            await ensurePhotoInAlbum(photo.id, albumSlug);
        }
    }
};

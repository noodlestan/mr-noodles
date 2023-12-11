import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { logger } from '../../logger';
import { Photo, PhotoDocument } from '../../models/photo';
import { ensurePhotoInAlbum, ensurePhotoNotInAlbum } from '../albums/ensurePhotoInAlbum';

import { detectPhotoUpdates } from './utils/detectPhotoUpdates';

export const updatePhotoFromScanEvent = async (
    event: EventScanFile,
    photo: PhotoDocument,
    hash: string,
    meta: Metadata,
    exif?: ExifData,
): Promise<void> => {
    const updates = detectPhotoUpdates(event, photo, hash, meta, exif);
    if (updates) {
        await Photo.findByIdAndUpdate(photo._id, updates);

        logger.debug('controller:photos:update-from-scan', {
            filename: photo.filename,
        });

        if (
            (updates.$set && 'album' in updates.$set) ||
            (updates.$unset && 'album' in updates.$unset)
        ) {
            if (photo.album) {
                ensurePhotoNotInAlbum(photo._id, photo.album);
            }
            if (updates?.$set?.album) {
                ensurePhotoInAlbum(photo._id, updates.$set.album as string);
            }
        }
    }
};

import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { logger } from '../../logger';
import { Photo, PhotoDocument } from '../../models/photo';
import { createAlbumFromSlugTitleAndPhotoId } from '../albums/createAlbumFromSlugTitleAndPhotoId';
import { ensurePhotoInAlbum } from '../albums/ensurePhotoInAlbum';
import { ensurePhotoNotInAlbum } from '../albums/ensurePhotoNotInAlbum';

import { detectPhotoUpdates } from './utils/detectPhotoUpdates';

export const updatePhotoFromScanEvent = async (
    event: EventScanFile,
    photo: PhotoDocument,
    hash: string,
    meta: Metadata,
    exif?: ExifData,
): Promise<void> => {
    const info = detectPhotoUpdates(event, photo, hash, meta, exif);
    if (info) {
        const { updates, album } = info;
        await Photo.findByIdAndUpdate(photo._id, updates);

        logger.debug('controller:photos:update-from-scan', {
            filename: photo.filename,
        });

        if (
            (updates.$set && 'album' in updates.$set) ||
            (updates.$unset && 'album' in updates.$unset)
        ) {
            if (photo.album) {
                await ensurePhotoNotInAlbum(photo._id, photo.album);
            }
            if (updates?.$set?.album && album) {
                const { slug, title } = album;
                try {
                    await createAlbumFromSlugTitleAndPhotoId(slug, title, photo.id);
                } catch (err) {
                    const message = (err as Error).message;
                    if (!/duplicate key error collection/.test(message)) {
                        throw err;
                    }
                }

                await ensurePhotoInAlbum(photo._id, slug as string);
            }
        }
    }
};

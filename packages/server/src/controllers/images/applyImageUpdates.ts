import type { ImageNoodle } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { applyFileUpdates } from '../files/applyFileUpdates';

export const applyImageUpdates = (
    event: EventScanFile,
    image: ImageNoodle,
    meta: Metadata,
    exif?: ExifData,
    hash?: string,
): {
    changed: boolean;
    value: ImageNoodle;
} => {
    return applyFileUpdates<ImageNoodle>(event, image, meta, exif, hash);
};

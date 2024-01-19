import type { VideoNoodle } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { applyFileUpdates } from '../files/applyFileUpdates';

export const applyVideoUpdates = (
    event: EventScanFile,
    video: VideoNoodle,
    meta: Metadata,
    exif?: ExifData,
    hash?: string,
): {
    changed: boolean;
    value: VideoNoodle;
} => {
    return applyFileUpdates<VideoNoodle>(event, video, meta, exif, hash);
};

import type { VideoNoodle } from '@noodlestan/shared-types';
import { ExifData } from 'exif';
import { Metadata } from 'sharp';

import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { updateNoodle } from '../../noodles';

import { applyVideoUpdates } from './applyVideoUpdates';

export const updateVideoFromScanEvent = async (
    event: EventScanFile,
    video: VideoNoodle,
    meta: Metadata,
    exif?: ExifData,
    hash?: string,
): Promise<void> => {
    const { changed, value: updated } = applyVideoUpdates(event, video, meta, exif, hash);

    if (changed) {
        updateNoodle(updated);
        log().debug('controller:files:videos:update-from-scan', {
            filename: video.filename,
        });
    }
};

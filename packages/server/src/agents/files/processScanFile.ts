import type { ImageNoodle, VideoNoodle } from '@noodlestan/shared-types';
import sharp from 'sharp';

import { createImageFromScanEvent } from '../../controllers/images/createImageFromScanEvent';
import { updateImageFromScanEvent } from '../../controllers/images/updateImageFromScanEvent';
import { createVideoFromScanEvent } from '../../controllers/videos/createVideoFromScanEvent';
import { updateVideoFromScanEvent } from '../../controllers/videos/updateVideoFromScanEvent';
import { publish } from '../../events';
import { FILE_PROCESS_ERROR, FileProcessError } from '../../events/file';
import { EventScanFile } from '../../events/scan';
import { log } from '../../logger';
import { findNoodleByFilename } from '../../noodles';
import { isImageFile } from '../../noodles/private/functions/isImageFile';
import { isVideoFile } from '../../noodles/private/functions/isVideoFile';

import { hashFile } from './utils/hashFile';
import { readExif } from './utils/readExif';

const processImageFile = async (event: EventScanFile) => {
    const file = await sharp(event.filename);
    const meta = await file.metadata();
    const exif = await readExif(event.filename);
    const buff = await file.toBuffer();

    const image = findNoodleByFilename<ImageNoodle>(event.root, event.filename);

    if (image !== undefined) {
        // TODO optional
        // const hash = hashFile(buff);
        await updateImageFromScanEvent(event, image, meta, exif);
    } else {
        const hash = hashFile(buff);
        await createImageFromScanEvent(event, hash, meta, exif);
    }
};

const procesVideoFile = async (event: EventScanFile) => {
    const file = await sharp(event.filename);
    const meta = await file.metadata();
    const exif = await readExif(event.filename);
    const buff = await file.toBuffer();

    const video = findNoodleByFilename<VideoNoodle>(event.root, event.filename);

    if (video !== undefined) {
        // TODO optional
        // const hash = hashFile(buff);
        await updateVideoFromScanEvent(event, video, meta, exif);
    } else {
        const hash = hashFile(buff);
        await createVideoFromScanEvent(event, hash, meta, exif);
    }
};

export const processScanFile = async (event: EventScanFile): Promise<void> => {
    log().debug('agent:files:process-scan', {
        filename: event.filename,
    });

    try {
        if (isImageFile(event.filename)) {
            await processImageFile(event);
        } else if (isVideoFile(event.filename)) {
            await procesVideoFile(event);
        } else {
            throw new Error('Unknown file type');
        }
    } catch (err) {
        publish<FileProcessError>(FILE_PROCESS_ERROR, {
            filename: event.filename,
            error: err as Error,
        });
    }
};

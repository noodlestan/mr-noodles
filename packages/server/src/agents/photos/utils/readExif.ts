import { ExifData, ExifImage } from 'exif';

import { publish } from '../../../events';
import { PHOTO_PROCESS_WARNING, PhotoProcessWarning } from '../../../events/photo';

export const readExif = async (filename: string): Promise<ExifData | undefined> => {
    return new Promise(resolve => {
        try {
            // eslint-disable-next-line no-new
            new ExifImage({ image: filename }, (error, exifData) => {
                if (error) {
                    publish<PhotoProcessWarning>(PHOTO_PROCESS_WARNING, {
                        filename,
                        message: error.message,
                    });
                    resolve(undefined);
                } else {
                    resolve(exifData);
                }
            });
        } catch (error) {
            const err = error as Error;
            publish<PhotoProcessWarning>(PHOTO_PROCESS_WARNING, {
                filename,
                message: err.message,
            });
        }
    });
};

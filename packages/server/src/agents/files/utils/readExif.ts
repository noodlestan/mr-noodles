import { ExifData, ExifImage } from 'exif';

import { publish } from '../../../events';
import { FILE_PROCESS_WARNING, FileProcessWarning } from '../../../events/file';

export const readExif = async (filename: string): Promise<ExifData | undefined> => {
    return new Promise(resolve => {
        try {
            // eslint-disable-next-line no-new
            new ExifImage({ image: filename }, (error, exifData) => {
                if (error) {
                    publish<FileProcessWarning>(FILE_PROCESS_WARNING, {
                        filename,
                        reason: error.message,
                    });
                    resolve(undefined);
                } else {
                    resolve(exifData);
                }
            });
        } catch (error) {
            const err = error as Error;
            publish<FileProcessWarning>(FILE_PROCESS_WARNING, {
                filename,
                reason: err.message,
            });
        }
    });
};

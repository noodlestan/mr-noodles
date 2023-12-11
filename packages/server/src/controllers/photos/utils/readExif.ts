import { ExifData, ExifImage } from 'exif';

export const readExif = async (filename: string): Promise<ExifData> => {
    return new Promise((resolve, reject) => {
        try {
            // eslint-disable-next-line no-new
            new ExifImage({ image: filename }, (error, exifData) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(exifData);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

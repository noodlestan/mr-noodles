import { ExifData } from 'exif';

export const dateFromExifDate = (exif: ExifData): Date | undefined => {
    if (!exif.exif.CreateDate) {
        return undefined;
    }

    const parts = exif.exif.CreateDate.split(' ');
    const str = parts[0].replace(/:/g, '/') + ' ' + parts[1];

    const date = new Date(str);

    return !isNaN(date.valueOf()) ? date : undefined;
};

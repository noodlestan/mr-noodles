import { ExifData } from 'exif';

import { convertDMSToDD } from './convertDMSToDD';

export const latLongFromExifGps = (exif: ExifData): { lat: number; long: number } | undefined => {
    if (!exif.gps) {
        return undefined;
    }

    const lat = convertDMSToDD(exif.gps.GPSLatitudeRef, exif.gps.GPSLatitude);
    const long = convertDMSToDD(exif.gps.GPSLongitudeRef, exif.gps.GPSLongitude);

    return lat && long ? { lat, long } : undefined;
};
